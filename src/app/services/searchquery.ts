import { Genres } from "../books/book";

export interface SearchQuery {
  titleLike?: string,
  genres?: Genres[],
  bookId?: number,
  authorId?: number,
}
