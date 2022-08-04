import { Author, Book } from "../../book";
import { createReducer, on } from "@ngrx/store";
import * as BookActions from "./books.actions";

export interface BookState {
  books : Book[],
  authors: Author[],
  lastSearch : {};
}

const initialState : BookState = {
  books: [],
  authors: [],
  lastSearch : {},
}

export const bookReducer = createReducer<BookState>(
  initialState,

  on(BookActions.loadBooks, (state,action) : BookState => {
    return{
      ...state,
      lastSearch : action.searchParams,
    }
  }),

  on(BookActions.loadBooksSuccess, (state, action) : BookState =>{
    return{
      ...state,
      books: action.books,
    };
  }),

  on(BookActions.loadBooksFailure, (state, action): BookState => {
    console.error(action.errorMessage);
    return{
      ...state,
      books: [],
    };
  }),

  on(BookActions.loadAuthorsSuccess, (state, action) : BookState => {
    return{
      ...state,
      authors: action.authors,
    };
  }),

  on(BookActions.loadAuthorsFailure, (state, action) : BookState => {
    return{
      ...state,
      authors: [],
    };
  }),

);
