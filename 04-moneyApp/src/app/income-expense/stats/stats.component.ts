import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
  incomes: number = 0;
  expenses: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;

  movementsSubs?: Subscription;

  // Doughnut chart data
  doughnutChartLabels: string[] = ['Income', 'Expenses'];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };
  doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.movementsSubs = this.store
      .select('incomeExpense')
      .subscribe(({ items }) => {
        this.generateStats(items);
      });
  }

  ngOnDestroy(): void {
    this.movementsSubs?.unsubscribe();
  }

  generateStats(movements: IncomeExpense[]) {
    this.resetStats();
    for (const movement of movements) {
      if (movement.type == 'income') {
        this.totalIncome += movement?.ammount ?? 0;
        this.incomes += 1;
      } else {
        this.totalExpenses += movement?.ammount ?? 0;
        this.expenses += 1;
      }
    }
    this.doughnutChartData.datasets = [
      { data: [this.totalIncome, this.totalExpenses] },
    ];
  }

  resetStats() {
    this.incomes = 0;
    this.expenses = 0;
    this.totalIncome = 0;
    this.totalExpenses = 0;
  }
}
