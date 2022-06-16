import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  movementsSubs?: Subscription;

  movements: IncomeExpense[] = [];

  constructor(
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.movementsSubs = this.store
      .select('incomeExpense')
      .subscribe(({ items }) => {
        this.movements = items;
      });
  }

  ngOnDestroy(): void {
    this.movementsSubs?.unsubscribe();
  }

  deleteItem(uid?: string) {
    this.incomeExpenseService
      .deleteItem(uid ?? '')
      .then(() =>
        Swal.fire({
          title: 'Deleted',
          icon: 'success',
          text: 'Item Deleted',
        })
      )
      .catch((err) =>
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: err.message,
        })
      );
  }
}
