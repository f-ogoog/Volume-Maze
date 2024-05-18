import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateBookMarkDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  @Min(0)
    value: number;
}