import { createAction, props } from "@ngrx/store";
import { SearchQuery } from "src/app/services/searchquery";
import { Author, Book } from "../../book";

export const loadBooks = createAction(
  '[Books] Searching for Books',
  props<{searchParams: SearchQuery}>()
);

export const loadBooksSuccess = createAction(
  '[Books] Search for Books was Successful',
  props<{books: Book[]}>()
);

export const loadBooksFailure = createAction(
  '[Books] Search for Books Failed',
  props<{errorMessage: string}>()
);

export const loadAuthors = createAction(
  '[Books] Searching for Authors',
  props<{searchParams: SearchQuery}>()
);

export const loadAuthorsSuccess = createAction(
  '[Books] Search for Authors was Successful',
  props<{authors: Author[]}>()
);

export const loadAuthorsFailure = createAction(
  '[Books] Search for Authors Failes',
  props<{errorMessage: string}>()
);
