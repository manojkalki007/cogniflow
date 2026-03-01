import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class CampaignsService {
  private readonly queue = new Queue('campaign-jobs', {
    connection: { host: 'localhost', port: 6379 },
  });

  list() {
    return { module: 'campaigns', items: [], queue: 'campaign-jobs' };
  }

  async startCampaign(campaignId: string) {
    await this.queue.add('start-campaign', { campaignId });
    return { status: 'queued', campaignId };
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
