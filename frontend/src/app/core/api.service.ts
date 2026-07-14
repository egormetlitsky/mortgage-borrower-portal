import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Application,
  ApplicationCreate,
  DocumentUpload,
  SimulateRequest,
  SimulateResponse,
  TokenResponse,
} from './api.models';

// Take-home simplification: hardcoded API base URL, no environment-specific
// build config. A real app would use Angular's environment files instead.
const API_BASE = 'http://localhost:8000';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  simulate(payload: SimulateRequest): Observable<SimulateResponse> {
    return this.http.post<SimulateResponse>(`${API_BASE}/simulate`, payload);
  }

  signup(email: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${API_BASE}/auth/signup`, { email, password });
  }

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${API_BASE}/auth/login`, { email, password });
  }

  createApplication(payload: ApplicationCreate): Observable<Application> {
    return this.http.post<Application>(`${API_BASE}/applications`, payload);
  }

  listApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${API_BASE}/applications`);
  }

  uploadDocument(applicationId: number, file: File): Observable<DocumentUpload> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DocumentUpload>(
      `${API_BASE}/applications/${applicationId}/documents`,
      formData,
    );
  }
}
