import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomeExpense } from '../models/incomeExpense.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  createIncomeExpense(movement: IncomeExpense) {
    const uid = this.authService.user?.userId;
    return this.firestore
      .doc(`${uid}/income-expenses`)
      .collection('items')
      .add(movement);
  }
}
