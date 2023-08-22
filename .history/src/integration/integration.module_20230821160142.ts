import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [UserModule, AuthModule],
  providers: [IntegrationService, UserService, JwtService],
  controllers: [IntegrationController]
})
export class IntegrationModule {}
