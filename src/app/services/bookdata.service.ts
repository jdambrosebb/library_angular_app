import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, filter, tap, map } from 'rxjs';
import { Author, Book, Genres } from '../books/book';
import { SearchQuery } from './searchquery';


@Injectable({
  providedIn: 'root'
})
export class BookdataService {

  constructor(private http: HttpClient) { }

  private bookURL = 'http://127.0.0.1:8000/book'; // URL to web api
  private authorURL = 'http://127.0.0.1:8000/author';

  public getAuthors(): Observable<Author[]>{
    console.log("Requesting data for URL: " + this.authorURL);
    return this.http.get<any[]>(this.authorURL).pipe(
      map(data => {
        let authorsToReturn: Author[] = []
        data.forEach(object => {
          const author = this.validateAuthor(object);
          if(author){
            authorsToReturn.push(author);
          }
        });
        return authorsToReturn;
      })
    );
  }

  public getBooks(searchParams?: SearchQuery): Observable<Book[]>{

    let url = this.bookURL;
    if(searchParams?.titleLike){
      url = url + '/?title='+searchParams.titleLike;
    }

    return this.http.get<any[]>(url).pipe(
      map(data => {
        let booksToReturn: Book[] = []
        data.forEach(object => {
          const book = this.validateBook(object)
          if(book){
            booksToReturn.push(book);
          }
        });
        return booksToReturn;
      })
    );
  }

  public getAuthorById(authorId: number): Observable<Author[]>{
    const url = `${this.authorURL}/${authorId}`;
    console.log("Requesting URL for: " + url);
    return this.http.get<any>(url).pipe(
      map(data => {
        const author = this.validateAuthor(data);
        return author ? [author] : [];
      })
    );
  }


  public getBookById(bookId: number) : Observable<Book | undefined> {
    const url = `${this.bookURL}/${bookId}`
    console.log("Requesting URL for: " + url);
    return this.http.get<any>(url).pipe(
      map(data => {
        const book = this.validateBook(data);
        return book ? book : undefined;
      }),
    );
  }

  private validateBook(data :any) : Book | undefined {
    let book: Book = {
      bookId: data['id'] || 0,
      title: data['title'] || "ERROR",
      synopsis: data['synopsis']||"ERROR",
      author: {
        authorId: data.author.id || data['author_id'],
        author_firstname: data['author']['first_name'] || 'ERROR',
        author_lastname: data['author']['last_name'] || 'ERROR'
      }
    }

     return (book.bookId > 0) ? book : undefined;
  }

  private validateAuthor(data: any) : Author | undefined {

    let books: Book[] = []
    if(data['books'] instanceof Array){
      data['books'].forEach(dataBook =>{
        const book = this.validateBook(dataBook);
        if(book){
          books.push(book);
        }
      });
    }

    let author : Author = {
      authorId: data['id'] || 0,
      firstname: data['first_name'] || 'ERROR',
      lastname: data['last_name'] || 'ERROR',
      books: books
    }

    return author.authorId > 0 ? author : undefined;

  }

  postBook(book: Book) : Observable<Book | undefined> {
    const url = `${this.authorURL}/${book.author.authorId}/book`;
    const body = {
      title: book.title,
      synopsis: book.synopsis,
    }

    console.log("Posting to ",url," with body "+body)
    return this.http.post<any>(url, body).pipe(
      tap(book => console.log("Post book received response", body)),
      map(data => {return this.validateBook(data)}),
    );
  }

  postAuthor(author: Author) : Observable<Author | undefined> {
    const body = {
      first_name: author.firstname,
      last_name: author.lastname,
      about: author.about || ""
    }
    console.log("Posting to ",this.authorURL," with body "+body)
    return this.http.post<any>(this.authorURL, body).pipe(
      map(data => {return this.validateAuthor(data)}),
      tap(author => console.log("Post author received response", author))
    );
  }

  deleteBook(bookId: number) : Observable<void> {
    const url = `${this.bookURL}/${bookId}`;
    return this.http.delete<void>(url).pipe(
      tap(data => console.log("SUCCESSFULLY DELETED BOOK ", bookId)),
    );
  }

  deleteAuthor(authorId: number) : void {
    const url = `${this.authorURL}/${authorId}`;
    console.log("Requesting delete from ", url);
    this.http.delete<void>(url).subscribe(
      data => console.log(`SUCCESSFULLY REMOVED AUTHOR ${authorId} FROM DATABASE`)
    );
  }

  putBook(book: Book) : Observable<Book | undefined> {
    const url = `${this.bookURL}/${book.bookId}`;
    const body = {
      title: book.title,
      synopsis: book.synopsis,
    }
    return this.http.put<any>(url, body).pipe(
      map(data => {return this.validateBook(data)}),
    );

  }

}
