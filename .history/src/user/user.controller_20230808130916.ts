import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userservice : UserService
){}

    @Post()
    create (@Body() createUserDto : Create)

}
