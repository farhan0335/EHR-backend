import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async getUser(email: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    return user;
  }
  async login(email: string, password: string): Promise<any> {
    const user = await this.getUser(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { user: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload , { secret: process.env.JWT_SECRET});
    return { access_token };
  }
}




