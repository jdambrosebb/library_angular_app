from fastapi import Depends, HTTPException, APIRouter
from sqlmodel import Session, select
from db import get_session
from schemas import BookOutput, BookInput, Book

router = APIRouter(prefix="/book")

@router.get("/", response_model=list[BookOutput])
def get_books(title: str|None = None,
                session: Session = Depends(get_session)) -> list:
    """Returns filtered data from the database"""
    query = select(Book)
    if title:
        query = query.where(Book.title.like('%'+ title + '%'))
    # exec returns a Result class that can be iterated over
    # method all converts all results in the Result immediately to python
    return session.exec(query).all()

@router.get("/{id}", response_model=BookOutput)
def book_by_id(id:int,
            session: Session = Depends(get_session)) -> Book:
    book = session.get(Book, id)
    if book:
        return book
    else:
        raise HTTPException(status_code=404,detail=f"No user with id={id}")

@router.delete("/{id}", status_code=204)
def remove_book(id: int,
            session: Session = Depends(get_session)) -> None:
    book = session.get(Book, id)
    if book:
        session.delete(book)
        session.commit()
    else:
        raise HTTPException(status_code=404, detail=f"No book has id={id}")


@router.put("/{id}", response_model=BookOutput)
def update_book(id:int, new_book:BookInput,
            session: Session = Depends(get_session)) -> Book:
    book = session.get(Book, id)
    if book:
        book.title = new_book.title
        book.synopsis = new_book.synopsis
        session.commit()
        return book
    else:
        raise HTTPException(status_code=404, detail=f"Could not update book; no book has id={id}")