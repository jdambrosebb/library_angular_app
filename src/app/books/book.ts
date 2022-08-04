export interface Book{
  bookId: number,
  title:string,
  author: {
    authorId: number,
    author_firstname: string,
    author_lastname: string,
  }
  genre?:Genres[],
  synopsis?:string,
}

export interface Author{
  authorId: number,
  firstname:string,
  lastname:string,
  books?: Book[],
  about?:string,
}

export enum Genres{
  SCIFI = "Sci-fi",
  FANTASY = "Fantasy",
  NONFICTION = "Non-fiction",
  YOUNG_ADULT = "Young adult",
  MYSTERY = "Mystery",
  HORROR = "Horror",
  ROMANCE = "Romance"
}
