import { Body, Controller, Param, Patch, Post, Req, Res, UseGuards, Headers, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/user/user-roles.enum';
import {Roles} from './roles.decorator'
import { RoleGuard } from './role.guard';
import { request } from 'http';

@Controller('login')
export class AuthController {
  userService: any;
  constructor(private readonly authService: AuthService) {}

  @Post()
  // @UseGuards(AuthGuard("local"))
async login(@Body() loginDto: AuthLoginDto): Promise<any> {
    const { Email, Password } = loginDto;
    const response = await this.authService.login(Email, Password);
    return response;
  }
   @Post('refresh-token')
  async refreshAccessToken(@Headers('authorization') authorization: string,) {
    try {
      const newAccessToken = await this.authService.refreshAccessToken(authorization);

      // Set the new access token in the response
      return({ access_token: newAccessToken.access_token });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

@Post('admin')
  @UseGuards(LocalAuthGuard)
  @RoleGuard() // Enforce 'admin' role for this endpoint
async getAdminResource(@Headers('authorization') authorization: string) {
    // You can access the authenticated user from the request object
    // const user = request.user;

    // // Check if the user has the 'admin' role
    // if (user.role !== UserRole.Admin) {
    //   throw new UnauthorizedException('Unauthorized access');
    // }

    // // Logic to handle admin resource
    // try {
    //   const adminData = await this.authService.fetchAdminData();
    //   return adminData;
    // } catch (error) {
    //   // Handle errors
    // }
  }
}
