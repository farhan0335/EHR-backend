import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creat-user.dto';
import { UserUpdateDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userservice : UserService
){}

    @Post()
    create (@Body() createUserDto : CreateUserDto) {
        return this.userservice.create(createUserDto);
    }
      @Patch(':id')
  async update(@Param('id') userId: number, @Body() updateUserDto: UserUpdateDto) {
    return this.userservice.update(userId, updateUserDto);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt')) // Apply your authentication guard first
  @UseGuards(IsActiveMiddleware) // Then apply IsActiveMiddleware
  async update(@Param('id') userId: number, @Body() updateUserDto: UserUpdateDto) {
    return this.userService.update(userId, updateUserDto);
