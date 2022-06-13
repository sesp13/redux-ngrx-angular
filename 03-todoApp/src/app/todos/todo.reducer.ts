import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { createTodo, deleteTodo, editTodo, toggleTodo } from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Save the world'),
  new Todo('Defeat thanos'),
  new Todo('Conquer the girl'),
];

const _todoReducer = createReducer(
  initialState,
  on(createTodo, (state, { text }) => [...state, new Todo(text)]),
  on(toggleTodo, (state, { id }) =>
    state.map((todo) =>
      id == todo.id ? { ...todo, completed: !todo.completed } : todo
    )
  ),
  on(editTodo, (state, { id, text }) =>
    state.map((todo) => (id == todo.id ? { ...todo, text } : todo))
  ),
  on(deleteTodo, (state, { id }) => {
    return state.filter((todo) => todo.id !== id);
  })
);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
