// Actions
interface Action {
  type: string;
  payload?: any;
}

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

    default:
      return state;
  }

}

// Use reducer
const incrementerAction: Action = {
  type: 'INCREMENT',
};

const decrementerAction: Action = {
  type: 'DECREMENT',
};

const multiplyAction: Action = {
  type: 'MULTIPLY',
  payload: 2,
};

const divideAction: Action = {
  type: 'DIVIDE',
  payload: 5,
};

console.log(reducer(10, incrementerAction)); // 11
console.log(reducer(10, decrementerAction)); // 9
console.log(reducer(10, multiplyAction)); // 20
console.log(reducer(10, divideAction)); // 2
