from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from models import Base, Candidate
from schemas import CandidateSchema, CandidateCreateSchema
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from typing import List
import pandas as pd
import io

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.get("/")
async def home():
    return {"message": "Hello, World!"}

@app.get("/candidates/", response_model=List[CandidateSchema])
async def get_candidates(skip: int = 0, limit: int = 10, search: str = "", db: Session = Depends(get_db)):
    query = db.query(Candidate)
    
    if search:
        query = query.filter(Candidate.name.contains(search))

    candidates = query.offset(skip).limit(limit).all()
    
    for candidate in candidates:
        candidate.attachments = candidate.attachments.split(',') if candidate.attachments else []
        candidate.application_date = candidate.application_date.isoformat()
    return candidates

@app.post("/candidates/import/")
async def import_candidates(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV.")
    
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    # Validate required columns
    required_columns = ['name', 'email', 'phone', 'applied_role', 'application_date']
    for column in required_columns:
        if column not in df.columns:
            raise HTTPException(status_code=400, detail=f"Missing required column: {column}")

    count_imported = 0
    
    for index, row in df.iterrows():
        candidate = Candidate(
            name=row['name'],
            email=row['email'],
            phone=row['phone'],
            status='Pending',
            applied_role=row['applied_role'],
            application_date=pd.to_datetime(row['application_date']),
            stages=row.get('stages', '').split(',') if 'stages' in df.columns else [],
            attachments=row.get('attachments', '').split(',') if 'attachments' in df.columns else []
        )
        db.add(candidate)
        count_imported += 1

    try:
        db.commit()
    except Exception as e:
        db.rollback()  # Ensure rolling back in case of error
        raise HTTPException(status_code=500, detail="Failed to import candidates.")
    
    return {"message": f"{count_imported} candidates imported successfully"}

@app.get("/candidates/{candidate_id}", response_model=CandidateSchema)
async def get_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    candidate.attachments = candidate.attachments.split(',') if candidate.attachments else []
    
    return candidate

@app.post("/candidates/{candidate_id}/reject/")
async def reject_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    candidate.stages = "Rejected"
    db.commit()
    return {"message": "Candidate rejected"}

@app.post("/candidates/{candidate_id}/continue/")
async def continue_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    candidate.status = "Continue to Next Step"
    db.commit()
    return {"message": "Candidate status updated"}

@app.get("/candidates/{candidate_id}/pdf/")
async def generate_pdf(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    # Example of PDF generation logic placeholder
    pdf_path = f"/path/to/pdf/{candidate_id}.pdf"
    # Optionally use ReportLab or another library to create the PDF
    # Example:
    # c = canvas.Canvas(pdf_path)
    # c.drawString(100, 750, f"Candidate Name: {candidate.name}")
    # c.save()

    return {"message": "PDF generated", "pdf_path": pdf_path}