import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Injectable(User),
        
    ){}
}
