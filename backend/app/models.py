from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Borrower(Base):
    __tablename__ = "borrowers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)

    applications: Mapped[list["Application"]] = relationship(back_populates="borrower")


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    borrower_id: Mapped[int] = mapped_column(ForeignKey("borrowers.id"))
    status: Mapped[str] = mapped_column(String, default="draft")

    full_name: Mapped[str | None] = mapped_column(String, nullable=True)
    property_value: Mapped[float | None] = mapped_column(nullable=True)
    monthly_income: Mapped[float | None] = mapped_column(nullable=True)
    loan_amount: Mapped[float | None] = mapped_column(nullable=True)
    term_years: Mapped[int | None] = mapped_column(nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)

    borrower: Mapped["Borrower"] = relationship(back_populates="applications")
    documents: Mapped[list["Document"]] = relationship(back_populates="application")


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    application_id: Mapped[int] = mapped_column(ForeignKey("applications.id"))
    filename: Mapped[str] = mapped_column(String)
    storage_path: Mapped[str] = mapped_column(String)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)

    application: Mapped["Application"] = relationship(back_populates="documents")
