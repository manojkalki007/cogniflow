import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicApiService {
  list() {
    return { module: 'public-api', items: [] };
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
