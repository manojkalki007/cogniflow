import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantsService {
  list() {
    return { module: 'tenants', items: [] };
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
