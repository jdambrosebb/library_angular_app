import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { BookdataService } from 'src/app/services/bookdata.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Author, Book } from '../../book';

@Component({
  selector: 'app-addbookshellshell',
  templateUrl: './addbookshell.component.html',
  styleUrls: ['./addbookshell.component.css']
})
export class AddBookComponentShell implements OnInit {

  authors$ = new Observable<Author[]>();

  // Undefined indicates new book
  book$ = new Observable<Book|undefined>();

  constructor(private bookService : BookdataService,
              private activatedRoute: ActivatedRoute,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.authors$ = this.bookService.getAuthors();

    // Determines whether this is a new book or not
    const bookId = parseInt(this.activatedRoute.snapshot.paramMap.get('bookId') || '0');
    if(bookId > 0){
      this.book$ = this.bookService.getBookById(bookId);
    }
  }

  createNewAuthor(output: {author: Author, book: Book}) : void {
    this.bookService.postAuthor(output.author).subscribe(
      new_author=> {
        if(new_author){
          console.log('New author successfully created!');
          this.authors$ = this.bookService.getAuthors();
          // Only creates new book when author has been created
          output.book.author.authorId = new_author.authorId;
          this.createNewBook(output.book);
        }else{
          // TODO There has been an error creating the author
        }
      }
    );
  }

  createNewBook(book: Book) : void {
    this.bookService.postBook(book).subscribe(
      newBook => {
        if(newBook){
          this.navigationService.onBookSelected(newBook.bookId)
        }else{
          // TODO Error to screen
        }
      }
    );
  }

  updateBook(book: Book) : void {
    this.bookService.putBook(book).subscribe(
      newBook => {
        if(newBook){
          this.navigationService.onBookSelected(newBook.bookId)
        }else{
          // TODO Error to screen
        }
      }
    )

  }

}
