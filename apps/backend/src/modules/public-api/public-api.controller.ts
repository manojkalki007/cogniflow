import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicApiService } from './public-api.service';

@ApiTags('public-api')
@Controller('public-api')
export class PublicApiController {
  constructor(private readonly service: PublicApiService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
