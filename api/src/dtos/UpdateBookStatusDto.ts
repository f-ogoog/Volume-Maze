import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateBookStatusDto {
  @IsOptional()
  @IsEnum(Status)
    status?: Status;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
    date?: Date;
}