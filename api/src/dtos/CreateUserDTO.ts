import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../utils/GLOBALS';

export class CreateUserDTO {
  @IsNotEmpty(validationOptionsMsg('Username can not be empty'))
  @IsString(validationOptionsMsg('Username should be a string'))
  username: string;

  @IsNotEmpty(validationOptionsMsg('Email is can not be empty'))
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty(validationOptionsMsg('Password can not be empty'))
  @IsString(validationOptionsMsg('Password should be a string'))
  password: string;

  @IsNotEmpty(validationOptionsMsg('Firstname can not be empty'))
  @IsString(validationOptionsMsg('Firstname should be a string'))
  fullName: string;
}