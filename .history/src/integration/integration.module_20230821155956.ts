import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';

@Module({
  providers: [IntegrationService, User],
  controllers: [IntegrationController]
})
export class IntegrationModule {}
