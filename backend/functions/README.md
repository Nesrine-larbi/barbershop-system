# Twilio SMS Configuration for Firebase Functions

## Setup Instructions

### 1. Get Twilio Credentials
1. Sign up at https://www.twilio.com/try-twilio
2. Get your free trial phone number
3. Copy your Account SID and Auth Token from the dashboard

### 2. Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
firebase login
```

### 3. Initialize Firebase in your project
```bash
# From project root
firebase init functions
# Select your Firebase project
# Choose JavaScript
# Install dependencies
```

### 4. Set Twilio Configuration in Firebase
```bash
cd backend/functions
npm install

# Create .env file with your Twilio credentials
cat > .env << EOF
TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER
EOF

# Example:
# cat > .env << EOF
# TWILIO_ACCOUNT_SID=AC1234567890abcdef
# TWILIO_AUTH_TOKEN=your_auth_token_here
# TWILIO_PHONE_NUMBER=+12125551234
# EOF
```

**Note**: The `.env` file is automatically loaded by Firebase Functions v2. Make sure `.env` is in your `.gitignore` to keep credentials secure.

### 5. Deploy Functions to Firebase
```bash
# Deploy functions (will use .env file automatically)
firebase deploy --only functions
```

### 6. View/Update Configuration
```bash
# Update environment variables by editing .env file
nano .env

# Then redeploy
firebase deploy --only functions
```

### 7. Test Locally (Optional)
```bash
# Create .env file for local testing
cat > .env << EOF
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_phone_number
EOF

# Start local emulator
npm run serve
```

## Functions Included

### 1. sendBookingConfirmationSMS
- **Trigger**: Automatically when a new booking is created
- **Purpose**: Sends immediate SMS confirmation to user
- **Cost**: ~$0.0075 per SMS (Twilio pricing)

### 2. sendAppointmentReminders
- **Trigger**: Runs every hour (scheduled)
- **Purpose**: Sends reminder SMS 24 hours before appointment
- **Cost**: ~$0.0075 per SMS

### 3. sendCustomSMS
- **Trigger**: Callable function from your web app
- **Purpose**: Send custom SMS messages
- **Usage**: Call from frontend when needed

## Twilio Free Trial Limits
- $15 credit (enough for ~2000 SMS)
- Can only send to verified phone numbers during trial
- To send to any number, upgrade your Twilio account

## Firebase Billing
- Cloud Functions requires Blaze (pay-as-you-go) plan
- First 2M invocations/month are free
- Very low cost for small barbershop usage

## Verify Phone Numbers (During Twilio Trial)
1. Go to Twilio Console > Phone Numbers > Manage > Verified Caller IDs
2. Add phone numbers you want to test with
3. They'll receive a verification code

## Monitoring
- View logs: `firebase functions:log`
- View in Firebase Console: Functions > Logs
- View Twilio logs: Twilio Console > Monitor > Logs

## Troubleshooting
- If SMS not sending, check Firebase Functions logs
- Verify Twilio credentials are set correctly
- Ensure phone numbers are in E.164 format (+country code)
- Check Twilio account balance
