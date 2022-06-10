import { Action } from "../ngrx-fake/ngrx";

export const incrementerAction: Action = {
  type: 'INCREMENT',
};

export const decrementerAction: Action = {
  type: 'DECREMENT',
};

export const multiplyAction: Action = {
  type: 'MULTIPLY',
  payload: 2,
};

export const divideAction: Action = {
  type: 'DIVIDE',
  payload: 5,
};

export const resetAction: Action = {
  type: 'RESET',
};