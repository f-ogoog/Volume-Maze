import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookRepository {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  create (data: Prisma.BookUncheckedCreateInput) {
    return this.prismaService.book.create({ data });
  }

  findMany (data: Prisma.BookFindManyArgs) {
    return this.prismaService.book.findMany(data);
  }

  async count (data: Prisma.BookCountArgs) {
    return this.prismaService.book.count(
      data,
    );
  }
}