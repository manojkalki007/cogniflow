export interface LlmProvider {
  name: string;
  generateResponse(input: string, context: Record<string, unknown>): Promise<string>;
}

export interface SttProvider {
  name: string;
  transcribeStream(streamId: string): AsyncGenerator<string>;
}

export interface TtsProvider {
  name: string;
  synthesize(text: string, options?: Record<string, unknown>): Promise<Buffer>;
}

export interface TelephonyProvider {
  name: string;
  createOutboundCall(payload: Record<string, unknown>): Promise<{ callId: string }>;
}

export interface CrmProvider {
  name: string;
  pullContacts(): Promise<Record<string, unknown>[]>;
  pushCallOutcome(callId: string, payload: Record<string, unknown>): Promise<void>;
}
