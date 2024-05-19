import {QueryAllDTO} from "./QueryAllDTO";
import {IsArray, IsEnum, IsOptional} from "class-validator";

export class QueryAllBooksDTO extends QueryAllDTO {
  @IsOptional()
  @IsArray()
    category?: string[];

  @IsOptional()
  @IsEnum(['title', 'rating'])
    sort?: string;
}