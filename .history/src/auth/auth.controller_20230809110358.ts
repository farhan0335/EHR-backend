import { Body, Controller, Param, Patch, Post, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto';
@Controller('login')
export class AuthController {
  userService: any;
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
@Post()
async login(@Body() loginDto: AuthLoginDto, @Res() res): Promise<any> {
    const { Email, Password } = loginDto;
    const response = await this.authService.login(Email, Password);
    return response;
  }
    @Patch(':id/refresh-token')
  async updateRefreshToken(@Param('id') userId: number, @Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response) { // Add 'res' parameter
    return this.userService.updateRefreshToken(userId, refreshTokenDto, res);
  }
}