import { Body, Controller, Param, Patch, Post, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './auth.guard';
@Controller('login')
export class AuthController {
  userService: any;
  constructor(private readonly authService: AuthService) {}
@Post()
async login(@Body() loginDto: AuthLoginDto): Promise<any> {
    const { Email, Password } = loginDto;
    const response = await this.authService.login(Email, Password);
    return response;
  }
  @UseGuards(LocalAuthGuard)
    
}
