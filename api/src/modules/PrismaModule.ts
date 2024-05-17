import { Module } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { UserRepository } from '../repositories/UserRepository';
import { BookRepository } from '../repositories/BookRepository';
import { MarkRepository } from '../repositories/MarkRepository';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    BookRepository,
    MarkRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    BookRepository,
    MarkRepository,
  ],
})
export class PrismaModule {}