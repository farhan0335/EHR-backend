import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { IntegrationModule } from './integration/integration.module';
import { FileModule } from './fileUpload/file.module';
import {File}

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
      entities: [User, File],
      synchronize: true,

    }),
    FileModule,
    UserModule,
    AuthModule,
    PassportModule,
    IntegrationModule
  ],
  controllers: [AppController],  
  providers: [AppService],
})
export class AppModule {}
