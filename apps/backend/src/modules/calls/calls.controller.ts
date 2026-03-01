import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CallsService } from './calls.service';

@ApiTags('calls')
@Controller('calls')
export class CallsController {
  constructor(private readonly service: CallsService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
