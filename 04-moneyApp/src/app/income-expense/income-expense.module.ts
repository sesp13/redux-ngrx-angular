import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Pipes
import { OrderMovementPipe } from './pipes/order-movement.pipe';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { StatsComponent } from './stats/stats.component';
import { DetailComponent } from './detail/detail.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpenseComponent,
    StatsComponent,
    DetailComponent,
    OrderMovementPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutingModule
  ],
})
export class IncomeExpenseModule {}
