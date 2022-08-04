from fastapi import Depends, HTTPException, APIRouter
from sqlmodel import Session, select

from db import get_session, engine
from schemas import BookOutput, BookInput, Book, Author, AuthorInput, AuthorOutput

router = APIRouter(prefix="/author")

@router.get("/", response_model=list[AuthorOutput])
def get_author(session: Session = Depends(get_session)) -> list[Author]:
    query = select(Author)
    return session.exec(query).all()

@router.get("/{id}", response_model=AuthorOutput)
def get_author_by_id(id: int,
                    session: Session = Depends(get_session)) -> Author :
    author = session.get(Author, id)
    if author:
        return author
    else:
        raise HTTPException(status_code=404, detail=f"Could not find author with id={id}")

@router.delete("/{id}", status_code=204)
def delete_author(id: int, session: Session = Depends(get_session)):
    author = session.get(Author, id)
    if author:
        session.delete(author)
        session.commit()
    else:
        raise HTTPException(status_code=404, detail=f"Could not delete author; no author with id={id}")

@router.post("/", response_model=AuthorOutput)
def create_author(author: AuthorInput, session: Session = Depends(get_session)) -> Author:
    new_author = Author.from_orm(author)
    session.add(new_author)
    session.commit()
    session.refresh(new_author)
    return new_author

@router.put("/{id}", response_model=AuthorOutput)
def update_author(id: int, new_author: AuthorInput, session: Session = Depends(get_session)) -> Author:
    author = session.get(Author, id)
    if author:
        author.first_name = new_author.first_name
        author.last_name = new_author.last_name
        author.about = new_author.about
        session.commit()
        return author
    else:
        raise HTTPException(status_code=404, detail=f"Could not update author; no author with id={id}")

@router.post("/{author_id}/book", response_model=BookOutput)
def create_book(author_id: int, book_input: BookInput,
            session: Session = Depends(get_session)) -> Book:
    print("ADDBOOKPOST")
    author = session.get(Author, author_id)
    if author:
        new_book = Book.from_orm(book_input, update={'author_id': author_id})
        author.books.append(new_book)
        session.add(new_book) # Adds data to the session
        session.commit() # Saves the new data to database
        session.refresh(new_book) # Updates the new_book item, allows access to ID created on commit
        return new_book
    else:
        raise HTTPException(status_code=404, detail=f"Could not add book; because no valid author was found with id={id}")
