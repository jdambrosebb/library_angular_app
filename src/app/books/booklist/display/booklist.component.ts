import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {  } from '../state';
import { Author, Book } from '../../book';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})

export class BooklistComponent implements OnChanges{

  @Input() booksToDisplay: Book[] | null = [];

  @Output() bookSelected = new EventEmitter<number>();
  @Output() authorSelected = new EventEmitter<number>();

  dataSource = [];
  columnsToDisplay = ["title", "author"];

  constructor(){ }

  ngOnChanges() : void {

  }

  onBookSelected(bookId: number){
    this.bookSelected.emit(bookId);
  }

  onAuthorSelected(authorId: number){
    this.authorSelected.emit(authorId);
  }

}
