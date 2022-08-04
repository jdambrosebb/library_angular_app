from typing import Sequence
from fastapi.testclient import TestClient
from src.book_server.book_server import app


def test_setup(client: TestClient):
  assert 1 == 1
