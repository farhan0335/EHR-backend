import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/creat-user.dto';
import { JwtService } from '@nestjs/jwt';
import {UpdateUserDto} from './dto/'
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
        const access = this.jwtService.sign(payload, {secret : process.env.JWT_SECRET})
        delete user.Password;
        return user;
    }


     async findByEmail(email: string) {
    const user =  await this.userRepository.findOne({
      where: {
        Email: email,
      },
    });
    return user;
  }

    async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where : {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);
    return user;
  }
   async delete(id: number) {
    const user =  await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    return user;
  }

    
}
import { UpdateUserDto } from './dto/update.user.dto';
   
