from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from database import Base  # Make sure this import points correctly to your database file

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    stages = Column(String, nullable=False)  
    applied_role = Column(String, nullable=False)  
    application_date = Column(DateTime, nullable=False)
    attachments = Column(String, nullable=True)  # Change to String if using SQLite