export default () => ({
  providers: {
    llm: {
      geminiApiKey: process.env.GEMINI_API_KEY,
      openAiApiKey: process.env.OPENAI_API_KEY,
    },
    stt: {
      deepgramApiKey: process.env.DEEPGRAM_API_KEY,
      smallestPulseApiKey: process.env.SMALLEST_PULSE_API_KEY,
    },
    tts: {
      sarvamApiKey: process.env.SARVAM_API_KEY,
      smallestLightningApiKey: process.env.SMALLEST_LIGHTNING_API_KEY,
    },
    telephony: {
      exotelApiKey: process.env.EXOTEL_API_KEY,
      exotelSid: process.env.EXOTEL_SID,
      twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
      twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    },
    crm: {
      salesforceClientId: process.env.SALESFORCE_CLIENT_ID,
      zohoClientId: process.env.ZOHO_CLIENT_ID,
      hubspotApiKey: process.env.HUBSPOT_API_KEY,
    },
    payments: {
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      razorpaySecret: process.env.RAZORPAY_SECRET,
      polarApiKey: process.env.POLAR_API_KEY,
    },
  },
});
