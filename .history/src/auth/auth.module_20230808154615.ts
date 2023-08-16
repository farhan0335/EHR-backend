import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {User}

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
