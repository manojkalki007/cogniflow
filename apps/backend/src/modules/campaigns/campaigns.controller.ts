import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Post(':id/start')
  start(@Param('id') campaignId: string) {
    return this.service.startCampaign(campaignId);
  }

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
