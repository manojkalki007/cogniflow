import { Injectable } from '@nestjs/common';

@Injectable()
export class AgentsService {
  list() {
    return { module: 'agents', items: [] };
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
