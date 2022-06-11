import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [],
})
export class ChildComponent {
  @Input() counter: number = 0;
  @Output() counterChange = new EventEmitter<number>();

  constructor() {}

  multiply() {
    this.counter *= 2;
    this.emitCounter();
  }

  divide() {
    this.counter /= 2;
    this.emitCounter();
  }

  resetGrandChild(counter: number) {
    this.counter = counter;
    this.emitCounter();
  }

  emitCounter() {
    this.counterChange.emit(this.counter);
  }
}
