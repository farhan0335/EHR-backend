import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,

    }),
    TypeOrmModule.forRoot({

      type : 'postgres',
      host : 'locahost',
      username : 'postgres',
      port : 5432,
      password : moveBy,
      


    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
