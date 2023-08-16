import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'

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
      // entities: [User, Network, CryptoCurrency,NetworkAccount, ],
      synchronize: true,

    }),
  ],
  controllers: [AppController],  
  providers: [AppService],
})
export class AppModule {}
