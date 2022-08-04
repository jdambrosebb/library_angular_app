import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS  } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { AUTHORS, BOOKS } from 'src/app/mock_server/in_memory_data/book';
import { Book, Genres } from '../../books/book';
import { SearchQuery } from '../../services/searchquery';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {BOOKS, AUTHORS};
  }

  post(requestInfo : RequestInfo) : Observable<any> {

    let reqBody = JSON.parse(requestInfo.utils.getJsonBody(requestInfo.req)) as SearchQuery;

    // const authorID: number | undefined = 'authorId' in reqBody ? reqBody['authorId'] : undefined;
    // const title: string = 'title' in reqBody ? reqBody['title'] : "";
    // const genres: Genres[] = 'genres' in reqBody ? reqBody['genres'] : [];

    // console.log(`Title: ${title}`);
    // console.log(`genres: ${genres}`);


    if(reqBody.authorId){
      return this.authorSearch(requestInfo, reqBody.authorId);
    } else {
      return this.titleSearch(requestInfo, reqBody.titleLike || '', reqBody.genres || []);
    }

  }

  private authorSearch(requestInfo : RequestInfo, authorId: number) : Observable<any>{
    const booksByAuthor : Book[] = BOOKS.filter((book => book.author.authorId ===authorId));
    return requestInfo.utils.createResponse$(() : ResponseOptions =>  {
      const data = booksByAuthor;
      return {body: data, status: STATUS.OK};
    });
  }

  private titleSearch(requestInfo : RequestInfo, title: string, genres: Genres[]) : Observable<any>{
    const booksBySearch : Book[] = [];

    BOOKS.forEach((book =>{
          if(book.title.toLowerCase().includes(title.toLowerCase())
          // && genres.every((genre : Genres) => book.genre.includes(genre))
          ){
            booksBySearch.push(book);
          }
        }));

    return requestInfo.utils.createResponse$(() : ResponseOptions =>  {
      const data = booksBySearch;
      return {body: data, status: STATUS.OK};
    })
  }

}
