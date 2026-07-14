import { HttpErrorResponse } from '@angular/common/http';

interface FastApiValidationError {
  msg: string;
  loc: (string | number)[];
}

/**
 * FastAPI's `detail` field is a plain string for handler-raised HTTPExceptions,
 * but an array of Pydantic validation-error objects for automatic 422s (e.g. a
 * malformed email). Rendering the array directly stringifies to "[object Object]".
 */
export function extractErrorMessage(err: HttpErrorResponse, fallback: string): string {
  const detail = err?.error?.detail;

  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    return (detail as FastApiValidationError[]).map((e) => e.msg).join(' ');
  }

  return fallback;
}
