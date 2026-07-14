from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_borrower
from app.database import get_db
from app.models import Application, Borrower
from app.schemas import ApplicationCreate, ApplicationResponse

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("", response_model=ApplicationResponse, status_code=201)
async def create_application(
    payload: ApplicationCreate,
    borrower: Borrower = Depends(get_current_borrower),
    db: AsyncSession = Depends(get_db),
):
    application = Application(
        borrower_id=borrower.id,
        status="submitted",
        **payload.model_dump(),
    )
    db.add(application)
    await db.commit()
    await db.refresh(application)
    return application


@router.get("", response_model=list[ApplicationResponse])
async def list_applications(
    borrower: Borrower = Depends(get_current_borrower),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Application)
        .where(Application.borrower_id == borrower.id)
        .order_by(Application.created_at.desc())
    )
    return result.scalars().all()


@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(
    application_id: int,
    borrower: Borrower = Depends(get_current_borrower),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Application).where(Application.id == application_id))
    application = result.scalar_one_or_none()
    if application is None or application.borrower_id != borrower.id:
        raise HTTPException(status_code=404, detail="Application not found")
    return application
