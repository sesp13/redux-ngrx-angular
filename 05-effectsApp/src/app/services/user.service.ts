import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api';
  private usersUrl = `${this.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers() {
    const url = `${this.usersUrl}`;
    return this.http.get(url).pipe(map((result: any) => result['data']));
  }
}
