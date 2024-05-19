import { PrismaService } from '../database/PrismaService';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  create (data: Prisma.UserUncheckedCreateInput) {
    return this.prismaService.user.create({ data });
  }

  find (where: Prisma.UserWhereInput) {
    return this.prismaService.user.findFirst({ where });
  }

  findById (id: string) {
    return this.prismaService.user.findUnique({ where: { id } })
  }

  updateById (id: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}