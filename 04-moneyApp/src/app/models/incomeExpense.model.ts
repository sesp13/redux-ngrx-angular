export type TransactionType = 'income' | 'expense';

export interface IncomeExpense {
  description?: string;
  ammount?: number;
  type?: TransactionType;
  uid?: string;
}
