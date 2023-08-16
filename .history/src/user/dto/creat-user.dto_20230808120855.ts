
import {IsEmail, IsNotEmpty} from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    Email :S
}