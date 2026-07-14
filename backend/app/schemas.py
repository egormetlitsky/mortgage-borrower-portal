from datetime import datetime

from pydantic import BaseModel, EmailStr


class SignupRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class SimulateRequest(BaseModel):
    loan_amount: float
    interest_rate: float  # annual, percent e.g. 3.5
    term_years: int


class SimulateResponse(BaseModel):
    monthly_payment: float
    total_paid: float
    total_interest: float


class ApplicationCreate(BaseModel):
    full_name: str
    property_value: float
    monthly_income: float
    loan_amount: float
    term_years: int


class ApplicationResponse(BaseModel):
    id: int
    status: str
    full_name: str | None
    property_value: float | None
    monthly_income: float | None
    loan_amount: float | None
    term_years: int | None

    model_config = {"from_attributes": True}


class DocumentResponse(BaseModel):
    id: int
    filename: str
    uploaded_at: datetime

    model_config = {"from_attributes": True}
