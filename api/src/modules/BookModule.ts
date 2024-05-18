import { Module } from '@nestjs/common';
import { BookController } from '../controllers/BookController';
import { BookService } from '../services/BookService';
import { PrismaModule } from './PrismaModule';
import { BookMapper } from '../mappers/BookMapper';
import { BookByIdPipe } from '../BookByIdPipe';

@Module({
  controllers: [BookController],
  providers: [BookService, BookMapper, BookByIdPipe],
  imports: [PrismaModule],
  exports: [BookService],
})
export class BookModule {}