import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity'; 
import { UsersService } from 'src/users/users.service';
import { Strategy } from 'passport-local';

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UsersService) {
        super();
    }
    async validate(email: string, password : string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (!user.isVerified) {
            throw new UnauthorizedException('Please verify your email address');
        }
        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }
        const passwordIsCorrect = await user?.validatePassword(password)
        if (!passwordIsCorrect) {
            throw new BadRequestException('Invalid email or password');
        }
        return user;
    }
}