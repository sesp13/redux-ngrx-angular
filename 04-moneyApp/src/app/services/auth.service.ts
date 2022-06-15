import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
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
