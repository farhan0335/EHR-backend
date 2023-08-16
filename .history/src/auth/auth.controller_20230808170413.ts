import { Body, Controller, Param, Patch, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto';
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
@Post()
async login(@Body() loginDto: AuthLoginDto): Promise<any> {
    const { Email, Password } = loginDto;
    const response = await this.authService.login(Email, Password);
    return response;
  }
    @Patch(':id/refresh-token')
  async updateRefreshToken(@Param('id') userId: number, @Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response) { // Add 'res' parameter
    return this.userService.updateRefreshToken(userId, refreshTokenDto, res);
  }
}