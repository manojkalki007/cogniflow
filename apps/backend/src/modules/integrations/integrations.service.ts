import { Injectable } from '@nestjs/common';
import { ProviderRegistry } from './providers/provider.registry';

interface Connection {
  provider: string;
  type: 'telephony' | 'crm' | 'payments';
  connected: boolean;
  updatedAt: string;
  metadata?: Record<string, string>;
}

@Injectable()
export class IntegrationsService {
  private connections: Connection[] = [
    { provider: 'twilio', type: 'telephony', connected: false, updatedAt: new Date().toISOString() },
    { provider: 'exotel', type: 'telephony', connected: false, updatedAt: new Date().toISOString() },
    { provider: 'salesforce', type: 'crm', connected: false, updatedAt: new Date().toISOString() },
    { provider: 'zoho', type: 'crm', connected: false, updatedAt: new Date().toISOString() },
    { provider: 'hubspot', type: 'crm', connected: false, updatedAt: new Date().toISOString() },
  ];

  constructor(private readonly providerRegistry: ProviderRegistry) {}

  list() {
    return {
      providers: this.providerRegistry.listProviders(),
      features: ['contact-prefetch', 'call-outcome-sync', 'notes-sync', 'transcript-sync'],
      connections: this.connections,
    };
  }

  connect(provider: string, metadata?: Record<string, string>) {
    const existing = this.connections.find((item) => item.provider === provider);
    if (existing) {
      existing.connected = true;
      existing.updatedAt = new Date().toISOString();
      existing.metadata = metadata;
      return existing;
    }

    const created: Connection = {
      provider,
      type: 'crm',
      connected: true,
      updatedAt: new Date().toISOString(),
      metadata,
    };
    this.connections.push(created);
    return created;
  }

  disconnect(provider: string) {
    const existing = this.connections.find((item) => item.provider === provider);
    if (!existing) return { provider, connected: false };

    existing.connected = false;
    existing.updatedAt = new Date().toISOString();
    return existing;
  }

  architecture() {
    return {
      webhooks: true,
      oauthSupport: ['salesforce', 'zoho', 'hubspot'],
      signedCallbacks: true,
      retryPolicy: 'exponential-backoff',
    };
  }
}
