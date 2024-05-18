import {Body, Controller, Get, Param, Patch, Query, Req, UseGuards} from '@nestjs/common';
import { BookService } from '../services/BookService';
import { QueryAllBooksDTO } from '../dtos/QueryAllBooksDTO';
import { BookMapper } from '../mappers/BookMapper';
import { JwtAuthGuard } from '../utils/guards/JwtAuthGuard';
import { BookByIdPipe } from '../BookByIdPipe';
import { UpdateBookStatusDto } from '../dtos/UpdateBookStatusDto';

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

  @UseGuards(JwtAuthGuard)
  @Patch('/:bookId/status')
  changeStatus (
    @Req() req,
    @Param('bookId', BookByIdPipe) bookId: string,
    @Body() body: UpdateBookStatusDto,
  ) {
    return this.bookService.changeStatus(bookId, req.user.id, body);
  }
}