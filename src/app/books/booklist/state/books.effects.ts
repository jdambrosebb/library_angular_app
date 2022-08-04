import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of, tap } from "rxjs";
import { BookdataService } from "src/app/services/bookdata.service";
import * as BookActions from "./books.actions";

@Injectable()
export class BookEffects{

  constructor(private actions$: Actions,
    private bookService: BookdataService){}


  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      mergeMap( action => this.bookService.getBooks(action.searchParams).pipe(
        map(books => BookActions.loadBooksSuccess({books})),
        catchError(errorMessage => of(BookActions.loadBooksFailure({errorMessage})))
      ))
    );
  });

  loadAuthors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadAuthors),
      mergeMap( action => this.bookService.getAuthors().pipe(
        map(authors => BookActions.loadAuthorsSuccess({authors})),
        catchError(errorMessage => of(BookActions.loadAuthorsFailure({errorMessage})))
      ))
    );
  });


}
