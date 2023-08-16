import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '';

export class UserUpdateDto extends PartialType(CreateUserDto) {}