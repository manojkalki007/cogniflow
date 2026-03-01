import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { PrismaService } from '../../config/prisma.service';
import { ProviderRegistry } from './providers/provider.registry';

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService, PrismaService, ProviderRegistry],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
