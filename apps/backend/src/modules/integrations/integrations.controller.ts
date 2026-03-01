import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';

@ApiTags('integrations')
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly service: IntegrationsService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post(':provider/connect')
  connect(@Param('provider') provider: string, @Body() body: { metadata?: Record<string, string> }) {
    return this.service.connect(provider, body?.metadata);
  }

  @Post(':provider/disconnect')
  disconnect(@Param('provider') provider: string) {
    return this.service.disconnect(provider);
  }

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
