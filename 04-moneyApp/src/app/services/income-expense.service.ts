import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
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

  create(movement: IncomeExpense) {
    const uid = this.authService.user?.userId;
    return this.firestore
      .doc(`${uid}/income-expenses`)
      .collection('items')
      .add(movement);
  }

  initListener(uid: string = '') {
    // Get Movements per user
    return this.firestore
      .collection(`${uid}/income-expenses/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map(
            (document) =>
              ({
                uid: document.payload.doc.id,
                ...(document.payload.doc.data() as any),
              } as IncomeExpense)
          )
        )
      );
  }

  deleteItem(uidItem: string) {
    const uidUser = this.authService.user?.userId;
    return this.firestore
      .doc(`${uidUser}/income-expenses/items/${uidItem}`)
      .delete();
  }
}
