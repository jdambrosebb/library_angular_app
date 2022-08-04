import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book, Author } from '../../book';
import { UserrequestService } from 'src/app/services/userrequest.service';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.css']
})

export class BookviewComponent implements OnInit {
  @Input() book : Book | undefined | null;

  @Output() authorSelectEmitter = new EventEmitter<number>();
  @Output() bookDeleted = new EventEmitter();
  @Output() updateBookPressed = new EventEmitter();

  constructor(public userService : UserrequestService) { }
  ngOnInit(): void {  }

  onCheckOutClick(book : Book){
    this.userService.checkoutBook(book);
  }

  onReturnClick(book : Book){
    this.userService.returnBook(book);
  }

  onAuthorSelected(authorId : number){
    this.authorSelectEmitter.emit(authorId);
  }

  onDelete(){
    this.bookDeleted.emit();
  }

  onEditPressed(){
    this.updateBookPressed.emit();
  }

}
