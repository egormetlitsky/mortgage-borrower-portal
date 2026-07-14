from fastapi import APIRouter

from app.schemas import SimulateRequest, SimulateResponse

router = APIRouter(prefix="/simulate", tags=["simulate"])


@router.post("", response_model=SimulateResponse)
async def simulate(payload: SimulateRequest):
    monthly_rate = payload.interest_rate / 100 / 12
    n_payments = payload.term_years * 12

    if monthly_rate == 0:
        monthly_payment = payload.loan_amount / n_payments
    else:
        monthly_payment = (
            payload.loan_amount
            * monthly_rate
            * (1 + monthly_rate) ** n_payments
            / ((1 + monthly_rate) ** n_payments - 1)
        )

    total_paid = monthly_payment * n_payments
    total_interest = total_paid - payload.loan_amount

    return SimulateResponse(
        monthly_payment=round(monthly_payment, 2),
        total_paid=round(total_paid, 2),
        total_interest=round(total_interest, 2),
    )
