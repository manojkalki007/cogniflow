import { Injectable } from '@nestjs/common';

@Injectable()
export class CallsService {
  list() {
    return { module: 'calls', items: [] };
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
