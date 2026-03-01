import { Injectable } from '@nestjs/common';
import { ProviderRegistry } from './providers/provider.registry';

@Injectable()
export class IntegrationsService {
  constructor(private readonly providerRegistry: ProviderRegistry) {}

  list() {
    return {
      providers: this.providerRegistry.listProviders(),
      features: ['contact-prefetch', 'call-outcome-sync', 'notes-sync', 'transcript-sync'],
    };
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
