import { Pipe, PipeTransform } from '@angular/core';
import { ValidFilters } from 'src/app/filter/filter.type';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'filterTodo',
})
export class FilterTodoPipe implements PipeTransform {
  transform(todos: Todo[], filter: ValidFilters): Todo[] {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'pending':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }
}
