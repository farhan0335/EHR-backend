import { Body, Controller, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creat-user.dto';
import { ActivateUser, UserUpdateDto } from './dto/update.user.dto';
import { IsActiveMiddleware } from './isActive.middleware';
import { Roles } from 'src/auth/roles.decorator';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRole } from './user-roles.enum';

@Controller('user')
export class UserController {
  constructor(
    private readonly userservice: UserService
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userservice.create(createUserDto);
  }
  @Patch(':id')
  // @UseGuards(IsActiveMiddleware)
  async update(@Param('id') userId: number, @Body() updateUserDto: UserUpdateDto) {
    return this.userservice.update(userId, updateUserDto);
  }

  @Put(':id')
  @UseGuards(LocalAuthGuard, RoleGuard)
  @Roles(UserRole.Admin)
  // @UseGuards(IsActiveMiddleware)
  async acceptUser(@Param('id') userId: number, @Body() updateUserDto: ActivateUser) {
    return this.userservice.update(userId, updateUserDto);
  }

}
