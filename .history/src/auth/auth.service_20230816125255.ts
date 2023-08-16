import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './../user/entities/user.entity';
import { Request, Response } from 'express'; // Import Request and Response interfaces
import axios from 'axios';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async getUser(email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  async login(email: string, password: string): Promise<any> { // Add 'res' parameter
    const user = await this.getUser(email);
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.Email };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '1m',
      secret: process.env.JWT_SECRET,
    });
    const refresh_token = this.jwtService.sign({}, {
      expiresIn: '5m',
      secret: process.env.JWT_REFRESH_SECRET,
    });
    return { access_token, refresh_token };
  }

  async refreshAccessToken(authorizationHeader: string): Promise<{ access_token: string }> {
    try {
      const tokenParts = authorizationHeader.split(' ');

      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new UnauthorizedException('Invalid token format');
      }

      const refreshToken = tokenParts[1];
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload = { sub: user.id, email: user.Email };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      });

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    async fetchAdminData(): Promise<any> {
    try {
      // Example: Fetch admin data from a database
      const adminData = await Database.query('SELECT * FROM admin_data');
      return adminData;
    } catch (error) {
      // Handle errors
      throw new Error('Failed to fetch admin data');
    }
  }
}
  }


  //   async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
  //   try {
  //     const decoded = this.jwtService.verify(refreshToken, {
  //       secret: process.env.JWT_REFRESH_SECRET,
  //     });

  //     const user = await this.usersService.findById(decoded.sub);

  //     if (!user) {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     }

  //     const payload = { sub: user.id, email: user.Email };
  //     const access_token = this.jwtService.sign(payload, {
  //       expiresIn: '1h',
  //       secret: process.env.JWT_SECRET,
  //     });

  //     return { access_token };
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }
  // async refreshAccessToken(req: Request, res: Response, ): Promise<any> {



  //   // Add 'req' and 'res' parameters
  //   try {
  //      const refreshToken = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
  //     if (!refreshToken) {
  //       throw new UnauthorizedException('No refresh token found');
  //     }
  //     const decoded = this.jwtService.verify(refreshToken, {
  //       secret: process.env.JWT_REFRESH_SECRET,
  //     });
  //     const user = await this.usersService.findById(decoded.sub);  // Check if the refresh token is valid and belongs to a user
  //     if (!user) {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     }
  //     const payload = { sub: user.id, email: user.Email };
  //     const access_token = this.jwtService.sign(payload, {
  //       expiresIn: '1h', 
  //       secret: process.env.JWT_SECRET,
  //     });
  //     return { access_token };
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }
}




// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from './../user/user.service';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { User } from './../user/entities/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async getUser(email: string): Promise<User | null> {
//     return this.usersService.findByEmail(email);
//   }

//   async login(email: string, password: string): Promise<any> {
//     const user = await this.getUser(email);

//     if (!user || !(await bcrypt.compare(password, user.Password))) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const payload = { sub: user.id, email: user.Email };
//     const access_token = this.jwtService.sign(payload, {
//       expiresIn: '1h', // Set your desired expiration time for the access token
//       secret: process.env.JWT_SECRET,
//     });

//     const refresh_token = this.jwtService.sign({}, {
//       expiresIn: '7d', // Set your desired expiration time for the refresh token
//       secret: process.env.JWT_REFRESH_SECRET,
//     });

//     // Store the refresh token in the user entity or a separate storage (e.g., database, Redis)
//     user.refreshToken = refresh_token;
//     await this.usersService.update(user.id, { refreshToken: refresh_token });

//     return { access_token, refresh_token };
//   }

//   async refreshAccessToken(refresh_token: string): Promise<any> {
//     try {
//       const decoded = this.jwtService.verify(refresh_token, {
//         secret: process.env.JWT_REFRESH_SECRET,
//       });

//       // Check if the refresh token is valid and belongs to a user
//       const user = await this.usersService.findById(decoded.sub);

//       if (!user || user.refreshToken !== refresh_token) {
//         throw new UnauthorizedException('Invalid refresh token');
//       }

//       // Generate a new access token
//       const payload = { sub: user.id, email: user.Email };
//       const access_token = this.jwtService.sign(payload, {
//         expiresIn: '1h', // Set your desired expiration time for the new access token
//         secret: process.env.JWT_SECRET,
//       });

//       return { access_token };
//     } catch (error) {
//       throw new UnauthorizedException('Invalid refresh token');
//     }
//   }
// }


