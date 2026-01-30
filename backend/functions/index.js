import { onDocumentCreated } from 'firebase-functions/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineString } from 'firebase-functions/params';
import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables in local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Initialize Firebase Admin
const app = getApps().length ? getApp() : initializeApp();
const db = getFirestore(app);

// Get Twilio credentials from environment
const getTwilioCredentials = () => {
  console.log('DEBUG - Environment check:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('TWILIO_ACCOUNT_SID exists:', !!process.env.TWILIO_ACCOUNT_SID);
  console.log('TWILIO_AUTH_TOKEN exists:', !!process.env.TWILIO_AUTH_TOKEN);
  console.log('TWILIO_PHONE_NUMBER exists:', !!process.env.TWILIO_PHONE_NUMBER);
  
  // Force using hardcoded values for now (TEMP FIX)
  console.log('Using hardcoded values for testing');
  return {
    accountSid: 'ACd01370a51806c26496b8e47ff47b59e9',
    authToken: 'f7094d8bb5ff0d996b0ab20673399fa9',
    phoneNumber: '+19704260424'
  };
};

/**
 * Callable function to send booking confirmation SMS
 * Called directly from the frontend
 */
export const sendBookingConfirmationSMS = onCall({
  cors: true
}, async (request) => {
  try {
    const { data } = request;
    const { phone, name, service, date, time, price } = data;

    if (!phone || !name || !service) {
      throw new HttpsError('invalid-argument', 'Missing required booking data');
    }

    // Get Twilio credentials
    const credentials = getTwilioCredentials();
    const twilioClient = twilio(credentials.accountSid, credentials.authToken);

    // Format the message
    const message = `Booking Confirmed! ✅

Service: ${service}
Date: ${date}
Time: ${time}
Price: €${price}

Name: ${name}

Thank you for choosing L'Abeille Barbershop!

📍 118 Rue Saint Dizier, Nancy
📞 07 53 75 70 53`;

    // Send SMS via Twilio
    const result = await twilioClient.messages.create({
      body: message,
      from: credentials.phoneNumber,
      to: phone
    });

    console.log('Booking confirmation SMS sent:', result.sid);
    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error('Error sending booking confirmation SMS:', error);
    throw new HttpsError('internal', `Failed to send SMS: ${error.message}`);
  }
});

/**
 * Send immediate SMS notification when booking is created
 * Triggered automatically by Firestore onCreate (BACKUP METHOD)
 */
export const sendBookingConfirmationSMS_Auto = onDocumentCreated('bookings/{bookingId}', async (event) => {
  const snap = event.data;
  const context = event;
    try {
      // Get Twilio credentials
      const credentials = getTwilioCredentials();
      const twilioClient = twilio(credentials.accountSid, credentials.authToken);

      const booking = snap.data();

      if (!booking.phone || !booking.name) {
        console.log('Missing phone or name in booking:', booking);
        return null;
      }

      // Format the message
      const message = `Booking Confirmed! ✅

Service: ${booking.service.name}
Date: ${new Date(booking.date).toLocaleDateString()}
Time: ${booking.time}
Price: €${booking.service.price}

Name: ${booking.name}

Thank you for choosing L'Abeille Barbershop!

📍 118 Rue Saint Dizier, Nancy
📞 07 53 75 70 53`;

      // Send SMS via Twilio
      const result = await twilioClient.messages.create({
        body: message,
        from: credentials.phoneNumber,
        to: booking.phone
      });

      console.log('Auto SMS sent successfully:', result.sid);
      return result;
    } catch (error) {
      console.error('Error sending auto SMS:', error);
      return null;
    }
  });

/**
 * Scheduled function to send reminder SMS 24 hours before appointment
 * Runs every hour to check for upcoming appointments
 */
export const sendAppointmentReminders = onSchedule({
  schedule: 'every 1 hours',
  timeZone: 'Europe/Paris',
}, async (event) => {
  const context = event;
    try {
      // Get Twilio credentials
      const credentials = getTwilioCredentials();
      const twilioClient = twilio(credentials.accountSid, credentials.authToken);

      const now = new Date();
      const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const in25Hours = new Date(now.getTime() + 25 * 60 * 60 * 1000);

      // Query bookings happening in the next 24-25 hours
      const bookingsSnapshot = await db
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

        if (!booking.phone || !booking.name) {
          continue;
        }

        // Send reminder SMS
        const message = `Reminder: You have an appointment tomorrow! ⏰

Service: ${booking.service.name}
Date: ${new Date(booking.date).toLocaleDateString()}
Time: ${booking.time}

See you soon at L'Abeille Barbershop!

📍 118 Rue Saint Dizier, Nancy
📞 07 53 75 70 53`;

        promises.push(
          twilioClient.messages.create({
            body: message,
            from: credentials.phoneNumber,
            to: booking.phone
          }).then(() => {
            // Mark reminder as sent
            return db
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
export const sendCustomSMS = onCall(async (request) => {
  try {
    // Get Twilio credentials
    const credentials = getTwilioCredentials();
    const twilioClient = twilio(credentials.accountSid, credentials.authToken);

    const { data } = request;
    const { phoneNumber, message } = data;

    if (!phoneNumber || !message) {
      throw new HttpsError(
        'invalid-argument',
        'Phone number and message are required'
      );
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: credentials.phoneNumber,
      to: phoneNumber
    });

    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error('Error sending custom SMS:', error);
    throw new HttpsError('internal', error.message);
  }
});
