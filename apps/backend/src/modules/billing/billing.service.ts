import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  list() {
    return { module: 'billing', items: [] };
  }

  architecture() {
    return {
      streaming: true,
      interruptHandling: true,
      lowLatency: true,
      pluggableProviders: true,
    };
  }
}
