import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      port : 5432,
      password: 'my',
      database: 'health_record',
      // entities: [User],
      synchronize: true,

    }),
    UserModule,
  ],
  controllers: [AppController],  
  providers: [AppService, UserService],
})
export class AppModule {}
