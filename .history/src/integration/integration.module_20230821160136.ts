import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [UserModule, auth],
  providers: [IntegrationService, UserService, JwtService],
  controllers: [IntegrationController]
})
export class IntegrationModule {}
