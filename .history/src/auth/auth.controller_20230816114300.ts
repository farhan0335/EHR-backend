import { Body, Controller, Param, Patch, Post, Req, Res, UseGuards, Headers, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller('login')
export class AuthController {
  userService: any;
  constructor(private readonly authService: AuthService) {}
@UseGuards(AuthGuard(L))
  @Post()
async login(@Body() loginDto: AuthLoginDto): Promise<any> {
    const { Email, Password } = loginDto;
    const response = await this.authService.login(Email, Password);
    return response;
  }
  // @UseGuards(LocalAuthGuard)
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
 
  // @Post('refresh-token')
  // async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const newAccessToken = await this.authService.refreshAccessToken(req, res);

  //     // Set the new access token in the Authorization header
  //     res.setHeader('Authorization', `Bearer ${newAccessToken.access_token}`);

  //     // Return the new access token
  //     return (newAccessToken);
  //   } catch (error) {
  //     // Handle unauthorized or other errors
  //     return ({ message: 'Invalid refresh token' });
  //   }
  // }
}
