from sqlmodel import Field, Relationship, SQLModel

class BookInput(SQLModel): 
    title: str
    synopsis: str|None

class AuthorInput(SQLModel): 
    first_name: str
    last_name: str
    about: str

class BookOutput(BookInput):
    id: int
    author_id: int
    author: AuthorInput

class Book(BookInput, table=True):
    id: int | None = Field(primary_key=True, default=None)
    author_id: int = Field(foreign_key="author.id")
    author: "Author" = Relationship(back_populates="books")

class Author(AuthorInput, table = True):
    books: list[Book] = Relationship(back_populates="author")
    id: int | None = Field(primary_key=True, default=None)

class AuthorOutput(AuthorInput):
    id: int
    books: list[BookOutput] = []