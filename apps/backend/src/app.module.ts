import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import appConfig from './config/app.config';
import integrationsConfig from './config/integrations.config';
import { PrismaService } from './config/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AgentsModule } from './modules/agents/agents.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { BillingModule } from './modules/billing/billing.module';
import { SettingsModule } from './modules/settings/settings.module';
import { PublicApiModule } from './modules/public-api/public-api.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { CallsModule } from './modules/calls/calls.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, integrationsConfig],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    AuthModule,
    DashboardModule,
    AgentsModule,
    IntegrationsModule,
    CampaignsModule,
    BillingModule,
    SettingsModule,
    PublicApiModule,
    RealtimeModule,
    CallsModule,
    TenantsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
