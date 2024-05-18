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

  findById (id: string, include? : Prisma.BookInclude) {
    return this.prismaService.book.findUnique({ where: { id }, include });
  }

  find (where: Prisma.BookWhereInput) {
    return this.prismaService.book.findFirst({ where });
  }

  updateById (id: string, data: Prisma.BookUncheckedUpdateInput) {
    return this.prismaService.book.update({
      where: { id },
      data,
    });
  }

  async count (data: Prisma.BookCountArgs) {
    return this.prismaService.book.count(
      data,
    );
  }
}