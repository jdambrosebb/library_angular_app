import { Injectable } from '@angular/core';
import { Book } from '../books/book';

@Injectable({
  providedIn: 'root'
})
export class UserrequestService {

  constructor() { }

  requestedBooks : Book[] = [];

  checkoutBook(book: Book){
    this.requestedBooks.push(book);
  }

  returnBook(book:Book){

    const index = this.requestedBooks.indexOf(book);
    // console.log('index was ' + index);
    if(index > -1){
      // console.log('returning ' + index);
      this.requestedBooks.splice(index,1);
    }

  }

  ifIsCheckedOut(book: Book) : boolean{
    // console.log("ifIsCheckedOut returning " + this.requestedBooks.includes(book));
    return this.requestedBooks.includes(book);
  }


}
