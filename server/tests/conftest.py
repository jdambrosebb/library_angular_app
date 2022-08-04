from re import M
import pytest
from sqlmodel import SQLModel
from src.book_server import db
from src.book_server.book_server import app, engine, on_startup
import src.book_server.db as db_session
from sqlmodel.pool import StaticPool
from fastapi.testclient import TestClient
from pytest import MonkeyPatch


@pytest.fixture(name="client")
def client_fixture():
  client = TestClient(app)
  on_startup()
  yield client
  # Clears data for next test
  SQLModel.metadata.drop_all(engine)
