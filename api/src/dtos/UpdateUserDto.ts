import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
    username?: string;

  @IsOptional()
  @IsString()
    description?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
    avatar?: string;
}