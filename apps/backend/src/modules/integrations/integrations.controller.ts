import { Controller, Get } from '@nestjs/common';
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

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
