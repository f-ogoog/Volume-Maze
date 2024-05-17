import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/BookRepository';
import { Prisma } from '@prisma/client';
import { DatabaseUtils } from '../database/DatabaseUtils';
import { QueryAllBooksDTO } from '../dtos/QueryAllBooksDTO';

@Injectable()
export class BookService {
  constructor (
    private readonly bookRepository: BookRepository,
  ) {}

  getAll (query: QueryAllBooksDTO) {
    query.pageSize = query.pageSize ?? 16;
    const data: Prisma.BookFindManyArgs = {
      where: {
        AND: [
          DatabaseUtils.getSearch(query, 'title', 'rating'),
          DatabaseUtils.getStrictSearch(query.category, 'category')
        ],
      },
      ...DatabaseUtils.getSort(query, 'title')
    };
    return DatabaseUtils.paginate(this.bookRepository, query, data);
  }
}