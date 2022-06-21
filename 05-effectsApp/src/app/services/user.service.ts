import { HttpClient, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams().set('per_page', '8').set('delay', 3);
    return this.http
      .get(url, { params })
      .pipe(map((result: any) => result['data']));
  }

  getUser(id: string) {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url).pipe(map((result: any) => result['data']));
  }
}
