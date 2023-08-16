import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/creat-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>

    ){}
    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.findByEmail(createUserDto);
        if(existingUser) {
            throw new ConflictException("User Already Exist")
        }
    }
}
