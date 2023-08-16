import { Module } from '@nestjs/common';
import {ConfigM}
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
