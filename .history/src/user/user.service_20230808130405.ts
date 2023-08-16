import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/creat-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {

    
    
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private jwtService : JwtService

    ){}
    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.findByEmail(createUserDto.Email);
        if(existingUser) {
            throw new ConflictException("User Already Exists")
        }
        const user = this.userRepository.create(createUserDto)
        await this.userRepository.save(user)
        const payload = {
            userpasword : user.Password,
            useremail : user.Email 

        }
        const access = this.jwtService.sign(payload, {})
    }


     async findByEmail(email: string) {
    const user =  await this.userRepository.findOne({
      where: {
        Email: email,
      },
    });
    return user;
  }
    
}
   
