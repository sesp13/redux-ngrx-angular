import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grand-child',
  templateUrl: './grand-child.component.html',
  styles: [],
})
export class GrandChildComponent {
  @Input() counter: number = 0;
  @Output() counterChange = new EventEmitter<number>();

  constructor() {}

  reset(){
    this.counter = 0;
    this.counterChange.emit(this.counter);
  }
  
}
