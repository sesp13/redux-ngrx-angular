import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersSubs?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.usersSubs = this.store.select('users').subscribe(({ users }) => {
      this.users = users;
    });

    this.store.dispatch(loadUsers());
  }

  ngOnDestroy(): void {
      this.usersSubs?.unsubscribe();
  }

}
