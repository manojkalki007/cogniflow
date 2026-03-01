import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgentsService } from './agents.service';

@ApiTags('agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly service: AgentsService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
