export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface SimulateRequest {
  loan_amount: number;
  interest_rate: number;
  term_years: number;
}

export interface SimulateResponse {
  monthly_payment: number;
  total_paid: number;
  total_interest: number;
}

export interface ApplicationCreate {
  full_name: string;
  property_value: number;
  monthly_income: number;
  loan_amount: number;
  term_years: number;
}

export interface Application {
  id: number;
  status: string;
  full_name: string | null;
  property_value: number | null;
  monthly_income: number | null;
  loan_amount: number | null;
  term_years: number | null;
}

export interface DocumentUpload {
  id: number;
  filename: string;
  uploaded_at: string;
}
