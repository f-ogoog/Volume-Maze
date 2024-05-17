import {QueryAllDTO} from "./QueryAllDTO";
import {IsEnum, IsOptional} from "class-validator";

export class QueryAllBooksDTO extends QueryAllDTO {
  @IsOptional()
    category: string;

  @IsOptional()
  @IsEnum(['title', 'rating'])
    sort: string;
}