import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  list() {
    return { module: 'settings', items: [] };
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
