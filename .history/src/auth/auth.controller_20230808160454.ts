import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
@Post()
async login(@Body() loginDto: AuthLoginDto): Promise<any> {
    const { email, password } = loginDto;
    const response = await this.authService.login(email, password);
    return response;
  }
}