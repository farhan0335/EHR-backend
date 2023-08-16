import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './../user/entities/user.entity';
import { Request, Response } from 'express'; // Import Request and Response interfaces
import { RefreshTokenDto } from './dto/refresh-token.dto'; // Import the RefreshTokenDto

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getUser(email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  async login(email: string, password: string, res: Response): Promise<any> { // Add 'res' parameter
    const user = await this.getUser(email);

    if (!user || !(await bcrypt.compare(password, user.Password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.Email };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '1h', // Set your desired expiration time for the access token
      secret: process.env.JWT_SECRET,
    });

    const refresh_token = this.jwtService.sign({}, {
      expiresIn: '7d', // Set your desired expiration time for the refresh token
      secret: process.env.JWT_REFRESH_SECRET,
    });

    // Store the refresh token in an HttpOnly cookie
    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { access_token };
  }

  async refreshAccessToken(req: Request, res: Response): Promise<any> { // Add 'req' and 'res' parameters
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token found');
      }

      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Check if the refresh token is valid and belongs to a user
      const user = await this.usersService.findById(decoded.sub);

      if (!user) {
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

  
  
  