from typing import List, Optional
from pydantic import BaseModel, HttpUrl, validator
from datetime import datetime

# Candidate Schema
class CandidateSchema(BaseModel):
    id: int
    name: str
    image_url: HttpUrl  # URL of the uploaded image
    rating: Optional[float] = None  # Optional rating
    stages: str
    applied_role: str
    application_date: datetime
    attachments: List[HttpUrl] = []  # Default empty list for attachments


class CandidateCreateSchema(BaseModel):
    name: str
    image_url: HttpUrl  # Assume the URL of the uploaded image is provided
    rating: Optional[float] = None  # Optional field
    stages: List[str] = ["applied"]  # Can start with applied by default
    applied_role: str
    application_date: datetime
    attachments: List[HttpUrl] = []  # Default empty list for attachments

    @validator('application_date')
    def validate_application_date(cls, value):
        if value > datetime.now():
            raise ValueError('Application date cannot be in the future')
        return value