import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

console.log('🔍 Checking Twilio Configuration...\n');

// Check if credentials are set
console.log('Account SID:', accountSid ? `${accountSid.substring(0, 10)}...` : '❌ NOT SET');
console.log('Auth Token:', authToken ? `${authToken.substring(0, 10)}...` : '❌ NOT SET');
console.log('Phone Number:', phoneNumber || '❌ NOT SET');

if (!accountSid || !authToken) {
  console.log('\n❌ Twilio credentials are missing!');
  process.exit(1);
}

console.log('\n🔄 Testing Twilio Connection...\n');

try {
  const client = twilio(accountSid, authToken);
  
  // Fetch account details to verify connection
  const account = await client.api.accounts(accountSid).fetch();
  
  console.log('✅ Twilio Connection Successful!');
  console.log('\nAccount Details:');
  console.log('  Status:', account.status);
  console.log('  Friendly Name:', account.friendlyName);
  console.log('  Type:', account.type);
  console.log('  Date Created:', new Date(account.dateCreated).toLocaleDateString());
  
  // Check if we have a phone number configured
  if (!phoneNumber) {
    console.log('\n⚠️  Warning: TWILIO_PHONE_NUMBER is not set in .env file');
    console.log('   You need to add a phone number to send SMS messages.');
    
    // Try to fetch available phone numbers
    console.log('\n🔍 Fetching your Twilio phone numbers...');
    const incomingPhoneNumbers = await client.incomingPhoneNumbers.list({ limit: 20 });
    
    if (incomingPhoneNumbers.length > 0) {
      console.log('\n📞 Available phone numbers in your account:');
      incomingPhoneNumbers.forEach((number, index) => {
        console.log(`  ${index + 1}. ${number.phoneNumber} (${number.friendlyName})`);
      });
      console.log('\n💡 Add one of these to your .env file as TWILIO_PHONE_NUMBER');
    } else {
      console.log('\n⚠️  No phone numbers found in your Twilio account.');
      console.log('   You need to purchase a phone number from Twilio Console:');
      console.log('   https://console.twilio.com/us1/develop/phone-numbers/manage/incoming');
    }
  } else {
    console.log('\n✅ Phone number is configured:', phoneNumber);
  }
  
  console.log('\n✨ Test completed successfully!');
  
} catch (error) {
  console.log('\n❌ Twilio Connection Failed!');
  console.log('\nError Details:');
  console.log('  Code:', error.code);
  console.log('  Message:', error.message);
  
  if (error.status === 401) {
    console.log('\n❗ Authentication failed - Please check your credentials:');
    console.log('   - Account SID and Auth Token might be incorrect');
    console.log('   - Find them at: https://console.twilio.com/');
  }
  
  process.exit(1);
}
