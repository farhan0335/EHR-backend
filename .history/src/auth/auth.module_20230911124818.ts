import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LocalStrategy } from './local.strategy';
import { RoleGuard } from './role.guard';


@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    midd
    
    JwtModule.registerAsync({
      imports : [ConfigModule],
      useFactory:async () => ({ 
        secret : process.env.JWT_SECRET,
        signOptions : {expiresIn : "3m"}
        
      }),
      inject : [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, Repository<User>,  LocalStrategy, RoleGuard],
  exports : []
})
export class AuthModule {}
