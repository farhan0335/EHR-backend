import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
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
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub : user.id, email: user.Email };
    const access_token = this.jwtService.sign(payload , { expiresIn : '1h', secret: process.env.JWT_SECRET});
    const refresh_token = this.jwtService.sign({},{
      expiresIn : '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    })
    user.refreshToken = refresh_token
    await this.usersService.update(user.id, {re})
    return { access_token };
  }
    
  
  
  
  
  async refreshAccessToken(refresh_token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Check if the refresh token is valid and belongs to a user
      const user = await this.usersService.findById(decoded.sub);

      if (!user || user.refreshToken !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate a new access token
      const payload = { sub: user.id, email: user.Email };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1h', // Set your desired expiration time for the new access token
        secret: process.env.JWT_SECRET,
      });

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
  


