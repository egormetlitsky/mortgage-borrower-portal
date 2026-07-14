import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-apply-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apply.page.html',
})
export class ApplyPage {
  readonly step = signal(1);
  readonly error = signal<string | null>(null);
  readonly submitting = signal(false);

  fullName = '';
  propertyValue = 300000;
  monthlyIncome = 5000;
  loanAmount = 250000;
  termYears = 30;

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
  ) {}

  next(): void {
    this.step.update((s) => Math.min(s + 1, 3));
  }

  back(): void {
    this.step.update((s) => Math.max(s - 1, 1));
  }

  submit(): void {
    this.error.set(null);
    this.submitting.set(true);
    this.api
      .createApplication({
        full_name: this.fullName,
        property_value: this.propertyValue,
        monthly_income: this.monthlyIncome,
        loan_amount: this.loanAmount,
        term_years: this.termYears,
      })
      .subscribe({
        next: (application) => {
          this.submitting.set(false);
          this.router.navigate(['/upload', application.id]);
        },
        error: () => {
          this.submitting.set(false);
          this.error.set('Could not submit the application. Please try again.');
        },
      });
  }
}
