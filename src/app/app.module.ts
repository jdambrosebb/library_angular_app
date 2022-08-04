import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './user_dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenreSelectorComponent } from './genre-selector/genre-selector.component';
import { MaterialsModule } from './material/materials.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BooksModule } from './books/books.module';
import { BookViewShellComponent } from './books/bookview/shell/bookviewshell.component';
import { AuthorinfoshellComponent } from './books/authorinfo/shell/authorinfoshell.component';
import { BooklistshellComponent } from './books/booklist/shell/booklistshell.component';
import { AddBookComponentShell } from './books/addbook/shell/addbookshell.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'booksearch', component: BooklistshellComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'book/:bookId', component: BookViewShellComponent},
  {path: 'book/:bookId/edit', component: AddBookComponentShell},
  {path: 'addbook', component: AddBookComponentShell},
  {path: 'author/:authorId', component: AuthorinfoshellComponent},
  {path: 'addbook', component: AddBookComponentShell},
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DashboardComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    GenreSelectorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule,
    BrowserAnimationsModule,
    BooksModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  // schemas:
})
export class AppModule { }
