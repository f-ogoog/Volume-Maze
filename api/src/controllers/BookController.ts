import {Body, Controller, Get, Param, Patch, Query, Req, UseGuards} from '@nestjs/common';
import { BookService } from '../services/BookService';
import { QueryAllBooksDTO } from '../dtos/QueryAllBooksDTO';
import { BookMapper } from '../mappers/BookMapper';
import { JwtAuthGuard } from '../utils/guards/JwtAuthGuard';
import { BookByIdPipe } from '../BookByIdPipe';
import { UpdateBookStatusDto } from '../dtos/UpdateBookStatusDto';
import { UpdateBookMarkDto } from '../dtos/UpdateBookMarkDto';
import {UpdateBookDto} from "../dtos/UpdateBookDto";

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
  async changeStatus (
    @Req() req,
    @Param('bookId', BookByIdPipe) bookId: string,
    @Body() body: UpdateBookStatusDto,
  ) {
    await this.bookService.changeStatus(bookId, req.user.id, body);
    const book = await this.bookService.getById(bookId, req.user.id);
    return this.bookMapper.getBook(book);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:bookId/mark')
  async changeMark (
    @Req() req,
    @Param('bookId', BookByIdPipe) bookId: string,
    @Body() body: UpdateBookMarkDto,
  ) {
    await this.bookService.changeMark(bookId, req.user.id, body);
    const book = await this.bookService.getById(bookId, req.user.id);
    return this.bookMapper.getBook(book);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:bookId')
  async update (
    @Req() req,
    @Param('bookId', BookByIdPipe) bookId: string,
    @Body() body: UpdateBookDto,
  ) {
    const book = await this.bookService.update(bookId, req.user.id, body);
    return this.bookMapper.getBook(book);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:bookId')
  async getById (
    @Req() req,
    @Param('bookId', BookByIdPipe) bookId: string,
  ) {
    const book = await this.bookService.getById(bookId, req.user.id);
    return this.bookMapper.getBook(book);
  }
}