import {Injectable} from "@nestjs/common";
import {Book, BookStatus, Mark} from "@prisma/client";

@Injectable()
export class BookMapper {
  getBooks (books: Book[]) {
    return books.map((book) => ({
      id: book.id,
      title: book.title,
      rating: book.rating,
      author: book.author,
      cover: book.cover,
    }));
  }

  getBook (book: Book & { marks: Mark[]} & { bookStatuses: BookStatus[] }) {
    return {
      id: book.id,
      title: book.title,
      rating: book.rating,
      author: book.author,
      cover: book.cover,
      category: book.category,
      descriptionTitle: book.descriptionTitle,
      description: book.description,
      status: book.bookStatuses[0].status,
      date: book.bookStatuses[0].date,
      mark: book.marks[0].value,
    }
  }
}