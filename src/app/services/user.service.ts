import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
//we do not need this 'cause @auth0/angular-jwt does it for us
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
}