import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loadUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user?: User | null;
  paramsSub?: Subscription;
  userSub?: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(({ id }) => {
      this.loadUser(id);
    });

    this.userSub = this.store.select('user').subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  loadUser(id: string) {
    this.store.dispatch(loadUser({ id }));
  }
}
