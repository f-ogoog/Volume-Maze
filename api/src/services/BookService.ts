import { ForbiddenException, Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/BookRepository';
import { Prisma } from '@prisma/client';
import { DatabaseUtils } from '../database/DatabaseUtils';
import { QueryAllBooksDTO } from '../dtos/QueryAllBooksDTO';
import { UpdateBookStatusDto } from '../dtos/UpdateBookStatusDto';

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

  changeStatus (bookId: string, userId: string, body: UpdateBookStatusDto) {
    return body.status
      ? this.upsertStatus(bookId, userId, body)
      : this.deleteStatus(bookId, userId);
  }

  upsertStatus (bookId: string, userId: string, { status, date }: UpdateBookStatusDto) {
    return this.bookRepository.updateById(bookId, {
      bookStatuses: {
        upsert: {
          where: {
            bookId_userId: {
              userId,
              bookId,
            }
          },
          create: {
            userId,
            status,
            date,
          },
          update: {
            status,
            date: date ?? new Date,
          },
        },
      },
    });
  }

  async deleteStatus (bookId: string, userId: string) {
    const book = await this.bookRepository.find({
      bookStatuses: {
        some: {
          userId,
          bookId,
        }
      }
    });

    if (!book) throw new ForbiddenException('Status does not exist');
    return this.bookRepository.updateById(bookId, {
      bookStatuses: {
        delete: {
          bookId_userId: {
            bookId,
            userId,
          },
        },
      },
    });
  }
}