import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly service: CampaignsService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post(':id/start')
  start(@Body('campaignId') campaignId: string) {
    return this.service.startCampaign(campaignId);
  }

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
