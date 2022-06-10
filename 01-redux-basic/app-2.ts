// Actions
import {
  incrementerAction,
  decrementerAction,
  multiplyAction,
  divideAction,
  resetAction,
} from './counter/counter.actions';
import { Action } from './ngrx-fake/ngrx';

function reducer(state = 10, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;

    case 'DECREMENT':
      return state - 1;

    case 'MULTIPLY':
      return state * action.payload;

    case 'DIVIDE':
      return state / action.payload;

    case 'RESET':
      return (state = 0);

    default:
      return state;
  }
}

// Use reducer
console.log(reducer(10, incrementerAction)); // 11
console.log(reducer(10, decrementerAction)); // 9
console.log(reducer(10, multiplyAction)); // 20
console.log(reducer(10, divideAction)); // 2
console.log(reducer(10, resetAction)); // 0
