import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IncomeExpense, TransactionType } from '../models/incomeExpense.model';
import { IncomeExpenseService } from '../services/income-expense.service';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss'],
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {
  moneyForm: FormGroup = this.fb.group({
    description: ['', [Validators.required]],
    ammount: ['', [Validators.required, Validators.min(0)]],
  });

  transactionType: TransactionType = 'income';
  loadingSubscription?: Subscription;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select('ui')
      .subscribe(({ isLoading }) => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  submitMoneyForm() {
    if (this.moneyForm.invalid) return;

    this.store.dispatch(isLoading());

    const { description, ammount } = this.moneyForm.value;
    const movement: IncomeExpense = {
      description,
      ammount,
      type: this.transactionType,
    };
    this.incomeExpenseService
      .create(movement)
      .then(() => {
        this.store.dispatch(stopLoading());
        this.moneyForm.reset();
        Swal.fire({
          title: 'Success',
          text: 'Transaction created',
          icon: 'success',
        });
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      });
  }
}
