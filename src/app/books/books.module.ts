import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bookReducer } from './booklist/state/books.reducer';
import { StoreModule } from '@ngrx/store';
import { BookEffects } from './booklist/state/books.effects';
import { EffectsModule } from '@ngrx/effects';
import { BooklistComponent } from './booklist/display/booklist.component';
import { AddbookComponent } from './addbook/display/addbook.component';
import { RouterModule } from '@angular/router';
import { BookViewShellComponent } from './bookview/shell/bookviewshell.component';
import { BookviewComponent } from './bookview/display/bookview.component';
import { AuthorinfoshellComponent } from './authorinfo/shell/authorinfoshell.component';
import { AuthorinfoComponent } from './authorinfo/display/authorinfo.component';
import { BooklistshellComponent } from './booklist/shell/booklistshell.component';
import { SearchBarComponent } from './booklist/search-bar/search-bar.component';
import { MaterialsModule } from '../material/materials.module';
import { AddBookComponentShell } from './addbook/shell/addbookshell.component';

@NgModule({
  declarations: [
    BooklistComponent,
    BookviewComponent,
    AuthorinfoComponent,
    AddbookComponent,
    BookViewShellComponent,
    AuthorinfoshellComponent,
    BooklistshellComponent,
    SearchBarComponent,
    AddBookComponentShell,
    ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialsModule,
    StoreModule.forFeature('books', bookReducer),
    EffectsModule.forFeature([BookEffects]),
  ]
})
export class BooksModule { }
