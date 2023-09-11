import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creat-user.dto';
import { UserUpdateDto } from './dto/update.user.dto';
import { IsActiveMiddleware } from './isActive.middleware';

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
      @UseGuards
  async update(@Param('id') userId: number, @Body() updateUserDto: UserUpdateDto) {
    return this.userservice.update(userId, updateUserDto);
  }
  

}
