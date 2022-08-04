import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) { }

  onBookSelected(bookId: number){
    this.router.navigate(['/book/', bookId]);
  }

  onAuthorSelected(authorId: number){
    this.router.navigate(['/author/', authorId]);
  }

  routeToBookList(){
    this.router.navigate(['/booksearch']);
  }

  routeToBookEdit(bookId: number){
    this.router.navigate([`/book/${bookId}/edit`]);
  }
}
