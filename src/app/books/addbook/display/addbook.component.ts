import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, tap } from 'rxjs';
import { BookdataService } from 'src/app/services/bookdata.service';
import { Author, Book } from '../../book';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit, OnChanges {

  @Input() authors : Author[] | null = [];
  @Input() book : Book | undefined | null = undefined;

  @Output() createNewAuthor = new EventEmitter<{author: Author, book: Book}>();
  @Output() createNewBook = new EventEmitter<Book>();
  @Output() updateBookEmitter = new EventEmitter<Book>();

  public book_form : FormGroup;

  state : {addNewAuthor: boolean, selectedAuthor: Author | undefined, editMode: boolean} = {
    addNewAuthor: true,
    selectedAuthor: undefined,
    editMode: false,
  }

  constructor(private bookService: BookdataService, private formBuilder: FormBuilder) {
    this.book_form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      synopsis: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      author_about: new FormControl(''),
      checkbox: new FormControl(),
      authorSelection: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.displayBook();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.displayBook();
  }

  // Sets original values
  displayBook(): void {
    if(!this.book){
      this.book = this.getNewBookValue();
    }

    if(this.book.bookId > 0){
      this.state.editMode = true;
      this.state.addNewAuthor = false;
      this.book_form.controls['checkbox'].disable();
      this.book_form.controls['authorSelection'].disable();
      this.book_form.patchValue({
        checkbox: true,
        authorSelection: this.book.author.authorId
      })
    }

    this.book_form.patchValue({
      title: this.book.title,
      synopsis: this.book.synopsis || '',
      firstname: this.book.author.author_firstname,
      lastname: this.book.author.author_lastname,
      author_about: '',
    })
  }

  toggleNewAuthor(): void {
    this.state.addNewAuthor = !this.state.addNewAuthor;
  }

  selectAuthor(author: Author){
    this.state.selectedAuthor = author;
  }

  saveBook(): void {

    const book = this.getBookFromForm();
    // Need to post an author to database
    if(this.state.addNewAuthor){
      const author = this.getAuthorFromForm();
      this.createNewAuthor.emit({author: author, book: book});
    }else if(this.state.selectedAuthor){
      book.author.authorId = this.state.selectedAuthor.authorId;
      this.createNewBook.emit(book);
    }else{
      // TODO throw error to screen, not enough author info
    }

    this.book_form.reset();

  }

  updateBook() : void {
    const book = this.getBookFromForm();
    book.bookId = this.book?.bookId || 0;
    this.updateBookEmitter.emit(book);
  }

  // Refreshes Display to original book
  cancelDisplayClicked() : void {
    this.displayBook();
  }

  private getNewBookValue() : Book {
    return {
      bookId: 0,
      title: '',
      synopsis: '',
      genre: [],
      author: {
        authorId: 0,
        author_firstname: '',
        author_lastname: ''
      }
    };
  }

  private getBookFromForm() : Book {
    const title_value = this.book_form.value.title;
    const synopsis_value = this.book_form.value.synopsis;

    let book: Book = this.getNewBookValue();
    book.title = title_value;
    book.synopsis = synopsis_value;

    return book;
  }

  private getAuthorFromForm(): Author {
    const firstname_value: string = this.book_form.value.firstname;
    const lastname_value = this.book_form.value.lastname;
    const author_about = this.book_form.value.author_about;

    const author: Author = {
      authorId: 0, // Populated when inserted into database
      firstname: firstname_value,
      lastname: lastname_value,
      about: author_about,
    }

    return author;
  }
}
