import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creat-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userservice : UserService
){}

    @Post()
    create (@Body() createUserDto : CreateUserDto) {
        return this.userservice.
    }

}
