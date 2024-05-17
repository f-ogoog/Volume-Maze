import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class MarkRepository {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  create (data: Prisma.MarkUncheckedCreateInput) {
    return this.prismaService.mark.create({ data });
  }
}