import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get('catalog')
  catalog() {
    return this.service.getModelCatalog();
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Get('architecture')
  architecture() {
    return this.service.architecture();
  }
}
