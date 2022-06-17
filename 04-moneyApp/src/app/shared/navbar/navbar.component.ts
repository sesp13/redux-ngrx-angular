import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: User | null;

  userSubs?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
}
