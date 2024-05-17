import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from '../services/BookService';
import { QueryAllBooksDTO } from '../dtos/QueryAllBooksDTO';
import { BookMapper } from '../mappers/BookMapper';

@Controller('/books')
export class BookController {
  constructor (
    private readonly bookService: BookService,
    private readonly bookMapper: BookMapper,
  ) {}

  @Get()
  async getAll (
    @Query() query: QueryAllBooksDTO,
  ) {
    const books = await this.bookService.getAll(query);
    return {
      data: this.bookMapper.getBooks(books.data),
      pagination: books.pagination,
    }
  }
}