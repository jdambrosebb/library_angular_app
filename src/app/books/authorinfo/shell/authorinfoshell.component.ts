import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, concatWith, map, Observable, tap } from 'rxjs';
import { BookdataService } from 'src/app/services/bookdata.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Author, Book } from '../../book';

@Component({
  selector: 'app-authorinfoshell',
  templateUrl: './authorinfoshell.component.html',
  styleUrls: ['./authorinfoshell.component.css']
})
export class AuthorinfoshellComponent implements OnInit {

  author$ = new Observable<Author | undefined>();
  // booksByThisAuthor$ = new Observable<Book[]>();

  authorId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private bookService : BookdataService) { }

  ngOnInit(): void {

    this.authorId = parseInt(this.activatedRoute.snapshot.paramMap.get('authorId') || '0');
    this.author$ = this.bookService.getAuthorById(this.authorId).pipe(
      map(data => data[0]),
      tap(data => console.log(data))
    );
  }

  onBookSelected(bookId: number){
    console.log("Author info emitting bookId: " + bookId);
    this.navigationService.onBookSelected(bookId);
  }

  onAuthorDelete(author: Author){
    const waitForAllBooks = new Observable<void>();

    // Deletes all books from this author prior to author deletion
    if(author.books && author.books.length > 0){
      combineLatest(author.books.map(book => this.bookService.deleteBook(book.bookId))).subscribe(
        data => this.bookService.deleteAuthor(author.authorId),
      )
    }
    this.navigationService.routeToBookList();
  }

}
