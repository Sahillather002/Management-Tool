from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from models import Candidate  # Adjust the import based on your project structure
from database import Base  # Make sure Base is imported correctly from your database file

# Database connection details
DATABASE_URL = "sqlite:///./candidate.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    # Create tables if they do not exist
    Base.metadata.create_all(bind=engine)

def clear_candidates():
    # Clear all existing candidates from the database
    with SessionLocal() as db:
        try:
            db.query(Candidate).delete()  # This will delete all candidates
            db.commit()
            print("Cleared all candidates from the database.")
        except Exception as e:
            db.rollback()
            print(f"An error occurred while clearing candidates: {e}")

def populate_candidates():
    # Create tables first, if not already done
    init_db()
    clear_candidates()  # Clear existing candidates before populating

    # Use a context manager for the database session
    with SessionLocal() as db:
        try:
            # Predefined candidate data
            candidates_data = [
                {
                    "name": "Alice Smith",
                    "image_url": "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "rating": 4.5,
                    "stages": "applied", 
                    "applied_role": "Software Engineer",
                    "application_date": datetime(2023, 9, 15),
                    "attachments": "http://example.com/files/alice_resume.pdf"
                },
                {
                    "name": "Bob Johnson",
                    "image_url": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "rating": 3.8,
                    "stages": "screening",
                    "applied_role": "Data Scientist",
                    "application_date": datetime(2023, 9, 20),
                    "attachments": "http://example.com/files/bob_portfolio.pdf"
                },
                {
                    "name": "Charlie Brown",
                    "image_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "rating": 4.0,
                    "stages": "rejected",
                    "applied_role": "Product Manager",
                    "application_date": datetime(2023, 9, 22),
                    "attachments": "http://example.com/files/charlie_cv.pdf"
                },
            ]

            candidates = [Candidate(**candidate_data) for candidate_data in candidates_data]
            db.add_all(candidates) 

            db.commit()
            print("Candidates added successfully.")

        except Exception as e:
            db.rollback() 
            print(f"An error occurred: {e}")

def get_candidates():
    # Use a context manager for the database session
    with SessionLocal() as db:
        try:
            # Query all candidates
            candidates = db.query(Candidate).all()
            for candidate in candidates:
                print(f"ID: {candidate.id}, Name: {candidate.name}, Rating: {candidate.rating}, Applied Role: {candidate.applied_role}, Application Date: {candidate.application_date}, Stages: {candidate.stages}, Attachments: {candidate.attachments}")
        except Exception as e:
            print(f"An error occurred while fetching candidates: {e}")

if __name__ == "__main__":
    populate_candidates()  # Populate candidates first
    get_candidates()  # Then fetch and print candidates