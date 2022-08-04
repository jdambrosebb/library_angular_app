import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as AppState from "../../../../state/app.state";
import { Author, Book } from "../../book";
import { BookState } from "./books.reducer";

export interface State extends AppState.State{
  books: BookState,
}

// export interface BookDisplayData{
//   book: Book,
//   author: Author,
// }

const getBookFeatureState = createFeatureSelector<BookState>('books');

export const getBooks = createSelector(getBookFeatureState,
  state => state.books
);

export const getSearch = createSelector(getBookFeatureState,
  state => state.lastSearch
);

export const getBookDisplayData = createSelector(getBookFeatureState,
  (state) : Book[] => state.books
  // {

  //   let display : BookDisplayData[] = [];
  //   state.books.forEach(book => {
  //     let author = state.authors.find(a => a.authorId === book.author.authorId);
  //     if(author){
  //       display.push({
  //         book: book,
  //         author: author,
  //       })
  //     };
  //   });
  //   return display;

  //   }
);
