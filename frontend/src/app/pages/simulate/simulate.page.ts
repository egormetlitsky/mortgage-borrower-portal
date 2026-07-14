import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { SimulateResponse } from '../../core/api.models';

@Component({
  selector: 'app-simulate-page',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './simulate.page.html',
})
export class SimulatePage {
  loanAmount = 250000;
  interestRate = 3.5;
  termYears = 30;

  readonly result = signal<SimulateResponse | null>(null);
  readonly error = signal<string | null>(null);

  constructor(private readonly api: ApiService) {}

  submit(): void {
    this.error.set(null);
    this.api
      .simulate({
        loan_amount: this.loanAmount,
        interest_rate: this.interestRate,
        term_years: this.termYears,
      })
      .subscribe({
        next: (res) => this.result.set(res),
        error: () => this.error.set('Simulation failed. Check your inputs.'),
      });
  }
}
