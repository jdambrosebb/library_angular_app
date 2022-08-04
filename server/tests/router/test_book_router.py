from typing import Sequence
from fastapi.testclient import TestClient
from common_util import *
from src.book_server.db import engine

def test_get_all_books(client: TestClient):
  """Adds a valid book and tests that get book returns list of books of length 1"""
  post_author_and_book(client)
  response = client.get('/book')
  books = response.json()
  assert response.status_code == 200
  assert len(books) == 1

def test_get_all_books_with_search(client: TestClient):
  """Adds a book and tests that searching for the title returns a list containing the book"""
  post_author_and_book(client)
  response = client.get(f'/book/?title={test_title}')
  books = response.json()
  assert response.status_code == 200
  assert len(books) == 1

def test_get_books_with_no_results(client: TestClient):
  """Adds a book and tests that searching for something random returns no books"""
  post_author_and_book(client)
  response = client.get('/book/?title=NOTHING')
  books = response.json()
  assert response.status_code == 200
  assert len(books) == 0

def test_get_book(client: TestClient):
  """Adds a book and retrieves book at that ID"""
  post_author_and_book(client)
  response = client.get('/book/1')
  book = response.json()
  assert response.status_code == 200
  assert book["title"]  == test_title
  assert book["synopsis"] == test_synopsis
  assert book["author_id"] == 1

def test_get_missing_book(client: TestClient):
  """Attempts to retrieve book at invalid ID, tests for error code 404"""
  response = client.get('/book/99')
  assert response.status_code == 404

def test_delete_book(client: TestClient):
  """Adds a book and deletes that book from database"""
  post_author_and_book(client)
  response = client.delete('/book/1')
  response_get = client.get('/book/1')
  assert response.status_code == 204
  assert response_get.status_code == 404

def test_delete_invalid_book(client: TestClient):
  """Attempts to delete a book at an invalid ID, tests for error code 404"""
  response = client.delete('/book/99')
  assert response.status_code == 404

def test_put_book(client: TestClient):
  """Adds a book and updates the data, tests for accurate data added to database"""
  post_author_and_book(client)
  response = client.put('/book/1',
                      json = {
                        "title": 'updated_title',
                        "synopsis": 'updated_synopsis'
                      })
  book = response.json()
  assert response.status_code == 200
  assert book["title"]  == 'updated_title'
  assert book["synopsis"] == 'updated_synopsis'

def test_put_invalid_book(client: TestClient):
  """Adds a book and attempts to update with insufficien data, tests for error code 422"""
  post_author_and_book(client)
  response = client.put('/book/1',
                      json = {
                        "synopsis": 'updated_synopsis'
                      })
  assert response.status_code == 422

def test_put_on_missing_book(client: TestClient):
  """Attempts to update a book at an ID that does not exist"""
  response = client.put('/book/99',
                      json = {
                        "title": 'updated_title',
                        "synopsis": 'updated_synopsis'
                      })
  assert response.status_code == 404
