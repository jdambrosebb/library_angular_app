import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, tap } from 'rxjs';
import { SearchQuery } from 'src/app/services/searchquery';
import { Genres } from '../../book';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() searchFilter = new EventEmitter<SearchQuery>();

  genres: Genres[] = Object.values(Genres);
  state = {
    showGenreSearch: false,
  }

  currentSearch : SearchQuery = {
    titleLike: '',
    genres: [],
  }

  constructor() { }

  ngOnInit(): void {

    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    const typeahead = fromEvent(searchBox, 'input').pipe(
      map(e => (e.target as HTMLInputElement).value),
      debounceTime(10),
      distinctUntilChanged(),
    );

    typeahead.subscribe(data => this.onSearchChange(data));

  }

  toggleShowGenre(){
    this.state.showGenreSearch = !this.state.showGenreSearch;
  }


  onSearchChange(search: string) : void {
    console.log(search);
    this.currentSearch = {
      ...this.currentSearch,
      titleLike: search,
    };
    console.log(JSON.stringify(this.currentSearch));
    this.searchFilter.emit(this.currentSearch);
  }

  onChange(id:Genres) : void {

    // Typescript necessary, should never happen on local search
    if(!this.currentSearch.genres){
      return;
    }

    // Removes or adds genre depending on whether it exists or not
    const index = this.currentSearch.genres?.indexOf(id) || -1;
    let genresCopy = [...this.currentSearch.genres];
    if(index == -1){
      genresCopy.push(id);
    }else{
      genresCopy.splice(index, 1);
    }

    this.currentSearch = {
      ...this.currentSearch,
      genres: genresCopy,
    };

    this.searchFilter.emit(this.currentSearch);
  }

}
