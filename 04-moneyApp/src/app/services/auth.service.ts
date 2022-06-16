import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { parseFirebaseUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubscription?: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubscription = this.firestore
          .doc(`${fuser.uid}/user`)
          .valueChanges()
          .subscribe((dbUser) => {
            const user = parseFirebaseUser(dbUser);
            this.store.dispatch(setUser({ user }));
          });
      } else {
        this.userSubscription?.unsubscribe();
        this.store.dispatch(unSetUser());
      }
    });
  }

  isUserAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser !== null));
  }

  createUser(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser: User = {
          userId: user?.uid,
          name,
          email: user!.email,
        };
        return this.firestore.doc(`${user!.uid}/user`).set(newUser);
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
