import {PipeTransform, Injectable, ArgumentMetadata, ForbiddenException} from '@nestjs/common';
import {BookRepository} from "./repositories/BookRepository";
import {InvalidEntityIdException} from "./utils/exceptions/InvalidEntityIdException";

@Injectable()
export class BookByIdPipe implements PipeTransform {
  constructor (
    private readonly bookRepository: BookRepository,
  ) {}

  async transform(bookId: string) {
    const book = await this.bookRepository.findById(bookId);

    if (!book) throw new InvalidEntityIdException('Book');
    return bookId;
  }
}