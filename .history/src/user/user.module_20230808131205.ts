import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserController]
  pro
})
export class UserModule {}
