import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { PrismaService } from '../../config/prisma.service';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService, PrismaService],
  exports: [AgentsService],
})
export class AgentsModule {}
