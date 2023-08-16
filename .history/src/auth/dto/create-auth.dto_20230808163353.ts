import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
mail: string;

  @IsNotEmpty()
  password : string
}