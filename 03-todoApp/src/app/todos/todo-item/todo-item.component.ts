import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import { deleteTodo, editTodo, toggleTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo('');
  @ViewChild('localInput') localtextInput?: ElementRef;

  checkCompleted!: FormControl;
  txtInput!: FormControl;

  editing: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompleted = new FormControl(this.todo?.completed);
    this.txtInput = new FormControl(this.todo?.text, Validators.required);

    this.checkCompleted.valueChanges.subscribe((value) => {
      this.store.dispatch(toggleTodo({ id: this.todo.id }));
    });
  }

  edit() {
    this.txtInput.setValue(this.todo.text);
    this.editing = true;
    setTimeout(() => {
      this.localtextInput?.nativeElement.select();
    }, 1);
  }

  endEditing() {
    this.editing = false;
    if (this.txtInput.invalid) return;
    if (this.txtInput.value === this.todo.text) return;
    this.store.dispatch(
      editTodo({ id: this.todo.id, text: this.txtInput.value })
    );
  }

  deleteTodo() {
    this.store.dispatch(deleteTodo({ id: this.todo.id }));
  }
}
