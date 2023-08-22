import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [use],
  providers: [IntegrationService, UserService, JwtService],
  controllers: [IntegrationController]
})
export class IntegrationModule {}
