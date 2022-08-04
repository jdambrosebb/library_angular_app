from sqlmodel import Session, create_engine
import enviroment

engine = create_engine(
    'sqlite:///book_server.db',
    connect_args={"check_same_thread": False}, # Needed for SQLite
    echo=True # Log generate SQL
)

# yield will be hit after Fast API is done with it, meaning all functions that call this function
# will return here when complete.  This wraps all of the below functions in a with, which provides
# some level of protection in cases of possible data corruption
def get_session():
    with Session(engine) as session:
        yield session
