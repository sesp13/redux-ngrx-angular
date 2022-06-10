import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { counterReducer } from './counter/counter.reducer';
import {
  decrementerAction,
  divideAction,
  incrementerAction,
  multiplyAction,
} from './counter/counter.actions';

const store: Store = configureStore({ reducer: counterReducer });

store.subscribe(() => {
  console.log('Change', store.getState());
});

store.dispatch(incrementerAction);
store.dispatch(decrementerAction);
store.dispatch(multiplyAction);
store.dispatch(divideAction);

