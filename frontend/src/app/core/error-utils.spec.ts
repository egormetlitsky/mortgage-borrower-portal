import { HttpErrorResponse } from '@angular/common/http';
import { extractErrorMessage } from './error-utils';

describe('extractErrorMessage', () => {
  it('returns a plain string detail as-is (e.g. wrong password)', () => {
    const err = new HttpErrorResponse({ error: { detail: 'Invalid email or password' } });
    expect(extractErrorMessage(err, 'fallback')).toBe('Invalid email or password');
  });

  it('joins FastAPI validation-error array details (e.g. malformed email)', () => {
    const err = new HttpErrorResponse({
      error: { detail: [{ msg: 'value is not a valid email address', loc: ['body', 'email'] }] },
    });
    expect(extractErrorMessage(err, 'fallback')).toBe('value is not a valid email address');
  });

  it('falls back when detail is missing entirely (e.g. network error)', () => {
    const err = new HttpErrorResponse({ error: null });
    expect(extractErrorMessage(err, 'fallback')).toBe('fallback');
  });
});
