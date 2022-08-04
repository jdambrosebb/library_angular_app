import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author, Book } from '../../book';

@Component({
  selector: 'app-authorinfo',
  templateUrl: './authorinfo.component.html',
  styleUrls: ['./authorinfo.component.css']
})
export class AuthorinfoComponent implements OnInit {

  @Input() author : Author | undefined | null;
  @Output() bookSelectEmitter = new EventEmitter<number>();
  @Output() onAuthorDeleted = new EventEmitter<Author>();

  constructor() { }

  ngOnInit(): void {}

  onBookSelected(bookId: number){
    this.bookSelectEmitter.emit(bookId);
  }

  isDeleteButtonDisabled(){
    if(this.author && this.author.books && this.author.books.length === 0){
      return false;
    }else{
      return true;
    }
  }

  onAutorDelete(author: Author){
    this.onAuthorDeleted.emit(author);
  }

  getDeleteToolTipMessage(): string{
    return "All books from an author must be deleted before deleting this author."
  }

}
