import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports : [T],
  controllers: [UserController]
})
export class UserModule {}
