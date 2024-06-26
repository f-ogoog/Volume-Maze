import { ForbiddenException, Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/BookRepository';
import { Prisma, Status } from '@prisma/client';
import { DatabaseUtils } from '../database/DatabaseUtils';
import { QueryAllBooksDTO } from '../dtos/QueryAllBooksDTO';
import { UpdateBookStatusDto } from '../dtos/UpdateBookStatusDto';
import { UpdateBookMarkDto } from '../dtos/UpdateBookMarkDto';
import { UpdateBookDto } from '../dtos/UpdateBookDto';

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
          DatabaseUtils.getSearch(query, 'title', 'author'),
          DatabaseUtils.getSearchByArray(query.category, 'category'),
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

  async changeMark (bookId: string, userId: string, { value }: UpdateBookMarkDto) {
    await this.bookRepository.updateById(bookId, {
      marks: {
        upsert: {
          where: {
            userId_bookId: {
              userId,
              bookId,
            },
          },
          create: {
            userId,
            value,
          },
          update: {
            value,
          },
        },
      },
    });

    await this.updateRating(bookId);
  }

  async updateRating (bookId: string) {
    const book = await this.bookRepository.findById(bookId, { marks: true });

    const rating = +(book.marks.reduce((sum, mark) => mark.value + sum, 0) / book.marks.length).toFixed(2);

    await this.bookRepository.updateById(bookId, {
      rating,
    });
  }

  update (bookId: string, userId: string, body: UpdateBookDto) {
    const where = {
      bookId,
      userId,
    };

    return this.bookRepository.updateById(bookId, body, {
      bookStatuses: {
        where,
      },
      marks: {
        where,
      },
    });
  }

  getById (bookId: string, userId: string) {
    const where = {
      bookId,
      userId,
    };

    return this.bookRepository.findById(bookId, {
      bookStatuses: {
        where,
      },
      marks: {
        where,
      },
    });
  }

  async getAddedBooks (userId: string, status: string, pageSize?: number) {
    const data: Prisma.BookFindManyArgs = {
      where: this.getDataByStatus[status](userId),
    };

    return DatabaseUtils.paginate(this.bookRepository, { pageSize }, data);
  }

  private getDataByStatus = {
    added: (userId) => ({
      bookStatuses: {
        some: {
          userId,
          status: Status.ADDED,
        },
      },
    }),

    read: (userId) => ({
      bookStatuses: {
        some: {
          userId,
          status: Status.READ,
        },
      },
    }),

    marked: (userId) => ({
      marks: {
        some: {
          userId,
        },
      },
    }),
  }
}

