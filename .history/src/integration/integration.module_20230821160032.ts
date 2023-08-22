import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [IntegrationService, UserService, jwt],
  controllers: [IntegrationController]
})
export class IntegrationModule {}
