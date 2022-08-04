import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { BookdataService } from 'src/app/services/bookdata.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Author, Book } from '../../book';

@Component({
  selector: 'app-shell',
  templateUrl: './bookviewshell.component.html',
  styleUrls: ['./bookviewshell.component.css']
})
export class BookViewShellComponent implements OnInit {

  book$ = new Observable<Book | undefined >();
  bookId: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private navigationRouter : NavigationService,
    private bookService : BookdataService) { }

  ngOnInit(): void {
    this.bookId = parseInt(this.activatedRoute.snapshot.paramMap.get('bookId') || '0');
    this.book$ = this.bookService.getBookById(this.bookId);
  }

  onAuthorSelected(authorId: number){
      this.navigationRouter.onAuthorSelected(authorId);
  }

  onBookDelete(){
    this.bookService.deleteBook(this.bookId).subscribe(
      // TODO Push up success pop-up
    );
    this.navigationRouter.routeToBookList();
  }

  onUpdateClicked(){
    this.navigationRouter.routeToBookEdit(this.bookId);
  }

}
