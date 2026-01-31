import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import twilio from "npm:twilio@4.19.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 1. Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Get the Booking Data from the Database
    const payload = await req.json()
    const { record } = payload

    if (!record.customer_phone) {
      throw new Error("No phone number found in record")
    }

    // 3. Initialize Twilio
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    const messagingServiceSid = Deno.env.get('TWILIO_MESSAGING_SERVICE_SID')
    
    const client = twilio(accountSid, authToken)

    // 4. Format Date for French Clients
    const dateObj = new Date(record.start_time)
    const formattedDate = dateObj.toLocaleDateString('fr-FR', { 
        weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
    })

    // 5. Send SMS using your Messaging Service (MG...)
    const message = await client.messages.create({
      body: `Bonjour ${record.customer_name}, votre RDV pour ${record.service_type} est confirmé le ${formattedDate}. Code: ${record.reservation_code || 'N/A'}.`,
      messagingServiceSid: messagingServiceSid, // <--- Using your specific Service ID
      to: record.customer_phone,
    })

    console.log("SMS sent successfully ID:", message.sid)

    return new Response(JSON.stringify({ success: true, sid: message.sid }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Twilio Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})