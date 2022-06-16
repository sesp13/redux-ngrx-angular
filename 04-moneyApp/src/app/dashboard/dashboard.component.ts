import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../income-expense/income-expense.actions';
import { IncomeExpense } from '../models/incomeExpense.model';
import { User } from '../models/user.model';
import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription?: Subscription;
  incomeExpenseSubs?: Subscription;

  constructor(
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.setUserSubscription();
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubs?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  setUserSubscription(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => this.setIncomeExpenseSubscription(user));
  }

  setIncomeExpenseSubscription(user: User | null): void {
    this.incomeExpenseSubs = this.incomeExpenseService
      .initListener(user?.userId)
      .subscribe((movements: IncomeExpense[]) => {
        this.store.dispatch(setItems({ items: movements }));
      });
  }
}
