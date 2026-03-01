import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  list() {
    return {
      callsMade: 1280,
      callsPending: 230,
      liveCampaigns: 9,
      successRate: 72.4,
      avgLatencyMs: 640,
      creditUsage: { used: 81200, remaining: 18800 },
    };
  }

  architecture() {
    return {
      realtime: 'websocket + polling fallback',
      reports: ['csv', 'pdf'],
    };
  }
}
