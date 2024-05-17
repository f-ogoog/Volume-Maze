import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import {validationOptionsMsg} from "../utils/GLOBALS";

export class QueryAllDTO {
  @IsNumberString({}, {
    message: 'Page must be a number',
  })
  @IsOptional()
  page?: number;

  @IsNumberString({}, {
    message: 'PageSize must be a number',
  })
  @IsOptional()
  pageSize?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  sort?: string;

  @IsIn(['asc', 'desc'], validationOptionsMsg('Wrong value for order'))
  @IsOptional()
  order?: 'asc' | 'desc';
}

export class SortDTO {
  sort?: string;
  order?: 'asc' | 'desc';
}

export class SearchDTO {
  search?: string;
}

export class PageDTO {
  page?: number;
  pageSize?: number;
}

export class Page {
  take: number;
  skip: number;
}


export class Search<T> {
  OR: {
    [k in keyof T]: {
      contains: string;
      mode: 'default' | 'insensitive';
    }
  }[];
}

export class Sort {
  orderBy: {
    [k: string]: 'asc' | 'desc';
  };
}