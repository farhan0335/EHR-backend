import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()

  Email: string;

  @IsNotEmpty()
  password : string
}