import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss'],
})
export class IncomeExpenseComponent implements OnInit {
  moneyForm: FormGroup = this.fb.group({
    description: ['', [Validators.required]],
    ammount: ['', [Validators.required, Validators.min(0)]],
  });

  transactionType: 'income' | 'expense' = 'income';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submitMoneyForm() {
    if (this.moneyForm.invalid) return;
    console.log(this.moneyForm.value);
    console.log(this.transactionType);
  }
}
