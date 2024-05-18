import {Injectable} from "@nestjs/common";
import {Book} from "@prisma/client";

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

  getBook (book: Book) {
    return {
      id: book.id,
      title: book.title,
      rating: book.rating,
      author: book.author,
      cover: book.cover,
      category: book.category,
      descriptionTitle: book.descriptionTitle,
      description: book.description,
    }
  }
}