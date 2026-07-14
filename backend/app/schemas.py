from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., description="Plain text; hashed with bcrypt before storage.")


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str = Field(..., description="JWT. Pass as 'Authorization: Bearer <token>'.")
    token_type: str = "bearer"


class SimulateRequest(BaseModel):
    loan_amount: float = Field(..., description="Principal borrowed, in currency units (e.g. EUR).")
    interest_rate: float = Field(
        ..., description="Annual nominal interest rate, as a percentage (e.g. 3.5 for 3.5%)."
    )
    term_years: int = Field(..., description="Mortgage term length in years (e.g. 30).")


class SimulateResponse(BaseModel):
    monthly_payment: float = Field(..., description="Fixed monthly payment (principal + interest).")
    total_paid: float = Field(..., description="Total amount paid over the full term.")
    total_interest: float = Field(..., description="Total interest paid over the full term (total_paid - loan_amount).")


class ApplicationCreate(BaseModel):
    full_name: str = Field(..., description="Borrower's full legal name as it should appear on the application.")
    property_value: float = Field(..., description="Estimated market value of the property being financed.")
    monthly_income: float = Field(..., description="Borrower's gross monthly income, used for affordability checks.")
    loan_amount: float = Field(..., description="Amount being requested for this mortgage.")
    term_years: int = Field(..., description="Requested mortgage term length in years.")


class ApplicationResponse(BaseModel):
    id: int
    status: str = Field(..., description="Application lifecycle state, e.g. 'draft' or 'submitted'.")
    full_name: str | None
    property_value: float | None
    monthly_income: float | None
    loan_amount: float | None
    term_years: int | None

    model_config = {"from_attributes": True}


class DocumentResponse(BaseModel):
    id: int
    filename: str = Field(..., description="Original filename as uploaded by the borrower.")
    uploaded_at: datetime

    model_config = {"from_attributes": True}
