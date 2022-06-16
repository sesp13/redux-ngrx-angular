import { Routes } from '@angular/router';
import { DetailComponent } from '../income-expense/detail/detail.component';
import { IncomeExpenseComponent } from '../income-expense/income-expense.component';
import { StatsComponent } from '../income-expense/stats/stats.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatsComponent },
  { path: 'income-expense', component: IncomeExpenseComponent },
  { path: 'detail', component: DetailComponent },
];
