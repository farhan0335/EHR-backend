import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports : [Ty],
  controllers: [UserController]
})
export class UserModule {}
