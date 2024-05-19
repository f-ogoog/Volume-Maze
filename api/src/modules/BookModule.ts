import { Module } from '@nestjs/common';
import { BookController } from '../controllers/BookController';
import { BookService } from '../services/BookService';
import { PrismaModule } from './PrismaModule';
import { BookByIdPipe } from '../BookByIdPipe';
import { MapperModule } from './MapperModule';

@Module({
  controllers: [BookController],
  providers: [BookService, BookByIdPipe],
  imports: [PrismaModule, MapperModule],
  exports: [BookService],
})
export class BookModule {}