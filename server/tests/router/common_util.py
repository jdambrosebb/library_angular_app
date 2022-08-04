from fastapi import Response
from fastapi.testclient import TestClient

test_title = 'Title'
test_synopsis = 'Synopsis'

test_firstname = 'Firstname'
test_lastname = 'Lastname'
test_about = 'About'

def post_valid_book(client: TestClient, id) -> Response:
  response = client.post(f'author/{id}/book',
                      json = {
                        "title": test_title,
                        "synopsis": test_synopsis
                      })
  return response

def post_valid_author(client: TestClient) -> Response:
  response = client.post('author/',
                         json = {
                           "first_name": test_firstname,
                           "last_name": test_lastname,
                           "about": test_about
                         })
  return response

def post_author_and_book(client: TestClient) -> Response:
  response = post_valid_author(client)
  id = response.json()['id']
  post_valid_book(client, id)
