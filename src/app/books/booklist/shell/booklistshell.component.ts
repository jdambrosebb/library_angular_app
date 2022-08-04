import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { Author, Book, Genres } from '../../book';
import { getBookDisplayData, State } from '../state';
import * as BookActions from '../state/books.actions';


@Component({
  selector: 'app-booklistshell',
  templateUrl: './booklistshell.component.html',
  styleUrls: ['./booklistshell.component.css']
})
export class BooklistshellComponent implements OnInit {

  booksToDisplay$ = new Observable<Book[]>();

  constructor(
    private store : Store<State>,
    private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.booksToDisplay$ = this.store.select(getBookDisplayData);

    this.store.dispatch(BookActions.loadBooks({searchParams: {}}));
    this.store.dispatch(BookActions.loadAuthors({searchParams: {}}));
  }

  onSearchFilterUpdate(searchParams: any) : void {
    this.store.dispatch(BookActions.loadBooks({searchParams: searchParams}));
  }

  onBookSelected(bookId: number){
    this.navigationService.onBookSelected(bookId);
  }

  onAuthorSelected(authorId: number){
    this.navigationService.onAuthorSelected(authorId);
  }

}
