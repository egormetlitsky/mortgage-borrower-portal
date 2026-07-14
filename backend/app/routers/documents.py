import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_borrower
from app.database import get_db
from app.models import Application, Borrower, Document
from app.schemas import DocumentResponse

router = APIRouter(prefix="/applications", tags=["documents"])

STORAGE_DIR = "./data/uploads"


@router.post(
    "/{application_id}/documents", response_model=DocumentResponse, status_code=201
)
async def upload_document(
    application_id: int,
    file: UploadFile,
    borrower: Borrower = Depends(get_current_borrower),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Application).where(Application.id == application_id))
    application = result.scalar_one_or_none()
    if application is None or application.borrower_id != borrower.id:
        raise HTTPException(status_code=404, detail="Application not found")

    os.makedirs(STORAGE_DIR, exist_ok=True)
    stored_name = f"{uuid.uuid4()}_{file.filename}"
    storage_path = os.path.join(STORAGE_DIR, stored_name)

    contents = await file.read()
    with open(storage_path, "wb") as f:
        f.write(contents)

    document = Document(
        application_id=application.id,
        filename=file.filename,
        storage_path=storage_path,
    )
    db.add(document)
    await db.commit()
    await db.refresh(document)
    return document
