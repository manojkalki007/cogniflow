import { Injectable } from '@nestjs/common';

interface CampaignRecord {
  id: string;
  name: string;
  agentId: string;
  phoneNumber: string;
  concurrencyLimit: number;
  status: 'draft' | 'scheduled' | 'running' | 'completed';
  totalContacts: number;
  processedContacts: number;
  createdAt: string;
}

@Injectable()
export class CampaignsService {
  private campaigns: CampaignRecord[] = [];

  list() {
    return this.campaigns;
  }

  create(payload: {
    name: string;
    agentId: string;
    phoneNumber: string;
    concurrencyLimit: number;
    totalContacts: number;
    runNow?: boolean;
  }) {
    const campaign: CampaignRecord = {
      id: `camp_${Math.random().toString(36).slice(2, 10)}`,
      status: payload.runNow ? 'running' : 'scheduled',
      processedContacts: 0,
      createdAt: new Date().toISOString(),
      ...payload,
    };

    this.campaigns.unshift(campaign);
    return campaign;
  }

  startCampaign(campaignId: string) {
    const campaign = this.campaigns.find((item) => item.id === campaignId);
    if (!campaign) return { status: 'not-found', campaignId };

    campaign.status = 'running';
    campaign.processedContacts = Math.min(campaign.totalContacts, campaign.processedContacts + 10);
    return { status: 'running', campaignId, processedContacts: campaign.processedContacts };
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
