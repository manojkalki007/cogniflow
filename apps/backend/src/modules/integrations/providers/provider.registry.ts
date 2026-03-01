import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderRegistry {
  listProviders() {
    return {
      llm: ['gemini-2-flash', 'gpt-4o'],
      stt: ['deepgram-nova-3', 'smallest-pulse'],
      tts: ['sarvam-bulbul-v2', 'smallest-lightning'],
      telephony: ['exotel', 'twilio'],
      crm: ['salesforce', 'zoho', 'hubspot', 'custom-webhook'],
      payments: ['razorpay', 'polar'],
    };
  }
}
