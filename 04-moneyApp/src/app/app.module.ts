import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

// Angular fire
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { StatsComponent } from './income-expense/stats/stats.component';
import { DetailComponent } from './income-expense/detail/detail.component';
import { OrderMovementPipe } from './income-expense/pipes/order-movement.pipe';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IncomeExpenseComponent,
    StatsComponent,
    DetailComponent,
    OrderMovementPipe,
  ],
  imports: [
    AuthModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
