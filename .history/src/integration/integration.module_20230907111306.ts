import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports : [TypeOrmModule.forFeature([User], 
    MulterModule.register),
UserModule,
AuthModule],
  providers: [IntegrationService, UserService, JwtService],
  controllers: [IntegrationController]
})
export class IntegrationModule {}
