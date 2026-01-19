import * as functions from 'firebase-functions';
import { defineString } from 'firebase-functions/params';
import * as admin from 'firebase-admin';
import twilio from 'twilio';

// Initialize Firebase Admin
admin.initializeApp();

// Define environment parameters (set these in Firebase Console or via CLI)
const twilioAccountSid = defineString('TWILIO_ACCOUNT_SID');
const twilioAuthToken = defineString('TWILIO_AUTH_TOKEN');
const twilioPhoneNumber = defineString('TWILIO_PHONE_NUMBER');

/**
 * Send immediate SMS notification when booking is created
 * Triggered automatically by Firestore onCreate
 */
export const sendBookingConfirmationSMS = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    try {
      // Initialize Twilio client with params
      const twilioClient = twilio(
        twilioAccountSid.value(),
        twilioAuthToken.value()
      );

      const booking = snap.data();
      const userId = booking.userId;

      // Get user's phone number
      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      const userData = userDoc.data();

      if (!userData || !userData.phone) {
        console.log('No phone number found for user:', userId);
        return null;
      }

      // Format the message
      const message = `Booking Confirmed! 
Service: ${booking.service.name}
Date: ${new Date(booking.date).toLocaleDateString()}
Time: ${booking.time}
Price: €${booking.service.price}

Thank you for choosing our barbershop!`;

      // Send SMS via Twilio
      const result = await twilioClient.messages.create({
        body: message,
        from: twilioPhoneNumber.value(),
        to: userData.phone
      });

      console.log('SMS sent successfully:', result.sid);
      return result;
    } catch (error) {
      console.error('Error sending SMS:', error);
      return null;
    }
  });

/**
 * Scheduled function to send reminder SMS 24 hours before appointment
 * Runs every hour to check for upcoming appointments
 */
export const sendAppointmentReminders = functions.pubsub
  .schedule('every 1 hours')
  .timeZone('Europe/Paris') // Change to your timezone
  .onRun(async (context) => {
    try {
      // Initialize Twilio client with params
      const twilioClient = twilio(
        twilioAccountSid.value(),
        twilioAuthToken.value()
      );

      const now = new Date();
      const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const in25Hours = new Date(now.getTime() + 25 * 60 * 60 * 1000);

      // Query bookings happening in the next 24-25 hours
      const bookingsSnapshot = await admin.firestore()
        .collection('bookings')
        .where('status', '==', 'confirmed')
        .where('date', '>=', in24Hours.toISOString().split('T')[0])
        .where('date', '<=', in25Hours.toISOString().split('T')[0])
        .get();

      const promises = [];

      for (const doc of bookingsSnapshot.docs) {
        const booking = doc.data();
        const bookingId = doc.id;

        // Check if reminder already sent
        if (booking.reminderSent) {
          continue;
        }

        // Get user's phone number
        const userDoc = await admin.firestore()
          .collection('users')
          .doc(booking.userId)
          .get();
        
        const userData = userDoc.data();

        if (!userData || !userData.phone) {
          continue;
        }

        // Send reminder SMS
        const message = `Reminder: You have an appointment tomorrow!
Service: ${booking.service.name}
Date: ${new Date(booking.date).toLocaleDateString()}
Time: ${booking.time}

See you soon at the barbershop!`;

        promises.push(
          twilioClient.messages.create({
            body: message,
            from: twilioPhoneNumber.value(),
            to: userData.phone
          }).then(() => {
            // Mark reminder as sent
            return admin.firestore()
              .collection('bookings')
              .doc(bookingId)
              .update({ reminderSent: true });
          })
        );
      }

      await Promise.all(promises);
      console.log(`Sent ${promises.length} reminder SMS messages`);
      return null;
    } catch (error) {
      console.error('Error sending reminders:', error);
      return null;
    }
  });

/**
 * Manually trigger SMS to a specific user (callable function)
 * Can be called from your web app for testing or custom notifications
 */
export const sendCustomSMS = functions.https.onCall(async (data, context) => {
  try {
    // Initialize Twilio client with params
    const twilioClient = twilio(
      twilioAccountSid.value(),
      twilioAuthToken.value()
    );

    // Check authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const { phoneNumber, message } = data;

    if (!phoneNumber || !message) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Phone number and message are required'
      );
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber.value(),
      to: phoneNumber
    });

    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error('Error sending custom SMS:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
