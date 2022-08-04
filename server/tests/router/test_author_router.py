from fastapi import Response
from fastapi.testclient import TestClient
from common_util import *

def test_get_all_authors(client: TestClient):
  """Adds 1 author then tests get all authors method returns length of 1"""
  post_valid_author(client)
  response = client.get('/author')
  authors = response.json()
  assert response.status_code == 200
  assert len(authors) ==1

def test_get_author(client: TestClient):
  """Adds one author then tests whether author exists at the expected ID with accurate data"""
  post_valid_author(client)
  response = client.get('/author/1')
  author = response.json()
  assert response.status_code == 200
  assert author['id'] == 1
  assert author['first_name'] == test_firstname
  assert author['last_name'] == test_lastname
  assert author['about'] == test_about

def test_get_nonexisting_author(client: TestClient):
  """Attempts to get author with an invalid ID, tests for return 404, author not found"""
  response = client.get('/author/99')
  assert response.status_code == 404

def test_delete_author(client: TestClient):
  """Adds one author then tests accurate deletion of that author"""
  post_valid_author(client)
  response = client.delete('/author/1')
  response2 = client.get('/author/1')
  assert response.status_code == 204
  assert response2.status_code == 404

def test_delete_author(client: TestClient):
  """Attempts to delete an author at an invalid ID, tests for return 404, author not found"""
  response = client.delete('/author/99')
  assert response.status_code == 404

def test_post_author(client: TestClient):
  """Adds one author and checks for accuarte data in the database"""
  response = post_valid_author(client)
  author = response.json()
  assert response.status_code == 200
  assert author['id'] == 1
  assert author['first_name'] == test_firstname
  assert author['last_name'] == test_lastname
  assert author['about'] == test_about

def test_post_author_incomplete(client: TestClient):
  """Adds one data entry with incomplete data, tests for returned error 422"""
  response = client.post('author/',
                         json = {
                           "first_name": 'FN',
                           "about": "ABOUT"
                         })
  assert response.status_code == 422

def test_put_author(client: TestClient):
  """Adds one valid author and updates at that ID, tests for updated data in database"""
  post_valid_author(client)
  response = client.put('author/1',
                         json = {
                           "first_name": "updated_firstname",
                           "last_name": "updated_lastname",
                           "about": "updated_about"
                         })
  author = response.json()
  assert response.status_code == 200
  assert author['id'] == 1
  assert author['first_name'] == "updated_firstname"
  assert author['last_name'] == "updated_lastname"
  assert author['about'] == "updated_about"

def test_put_undefined_author(client: TestClient):
  """Attempts to update an author at an invalid entry, tests for error code 404"""
  response = client.put('author/99',
                         json = {
                           "first_name": "updated_firstname",
                           "last_name": "updated_lastname",
                           "about": "updated_about"
                         })
  assert response.status_code == 404

def test_post_book_with_author(client: TestClient):
  """Adds an author and book for that author, tests that data was accurately added to database"""
  post_valid_author(client)
  response = post_valid_book(client, 1)
  book = response.json()
  assert response.status_code == 200
  assert book['id'] == 1
  assert book['title'] == test_title
  assert book['synopsis'] == test_synopsis

def test_post_book_with_invalid_author(client: TestClient):
  """Attempts to add a book for an author that doesn't exist, tests for error status 404, author not found"""
  response = client.post('author/1/book',
                         json = {
                           "title": 'Title',
                           "synopsis": 'Synopsis'
                         })
  books = response.json()
  assert response.status_code == 404

def test_post_incomplete_book(client: TestClient):
  """Attempts to add a book with insufficient data, tests for error 422"""
  post_valid_author(client)
  response = client.post(f'author/{id}/book',
                      json = {
                        "synopsis": test_synopsis
                      })
  assert response.status_code == 422
