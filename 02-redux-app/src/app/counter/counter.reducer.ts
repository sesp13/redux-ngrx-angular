import { Action, createReducer, on } from '@ngrx/store';
import {
  decrement,
  divide,
  increment,
  multiply,
  reset,
} from './counter.actions';

// My custom reducer
// export function counterReducer(state: number = 10, action: Action) {
//   switch (action.type) {
//     case increment.type:
//       return state + 1;
//     case decrement.type:
//       return state - 1;
//     default:
//       return state;
//   }
// }

// Reducer by NgRx

export const initialState: number = 10;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(multiply, (state, props) => state * props.number),
  on(divide, (state, props) => state / props.number),
  on(reset, () => 0)
);

export function counterReducer(state: number = initialState, action: Action) {
  return _counterReducer(state, action);
}
