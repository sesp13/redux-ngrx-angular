import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';

@Pipe({
  name: 'orderMovement',
})
export class OrderMovementPipe implements PipeTransform {
  transform(items: IncomeExpense[]): IncomeExpense[] {
    // Ordering the entering items throws an error for that reason we use spread ...
    const newItems = [...items];
    return newItems.sort((a, b) => {
      if (a.type == 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
