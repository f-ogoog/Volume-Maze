import {IsOptional, IsString} from "class-validator";

export class UpdateBookDto {
  @IsOptional()
  @IsString()
    descriptionTitle?: string;

  @IsOptional()
  @IsString()
    description?: string;
}