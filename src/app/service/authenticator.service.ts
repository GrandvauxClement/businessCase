import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Pro} from '../models/pro';

@Injectable({
  providedIn: 'root'
})

export class AuthenticatorService {
  apiUrl = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient, private jwtToken: JwtHelperService) { }

  login(credentials: Pro): Observable<any> {
    return this.http.post(this.apiUrl + 'login_check', {
      username: credentials.email,
      password: credentials.password
    });
  }

  saveUser(token: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
    };

    return this.http.get(this.apiUrl + 'api/pro', httpOptions);
  }

  public isAuthenticated(): boolean {
    const token =   window.sessionStorage.getItem('auth-token');

    // Check whether the token is expired and return
    // true or false
    return !this.jwtToken.isTokenExpired(token);
  }

  register(user: Pro): Observable<any> {
    return this.http.post(this.apiUrl + 'register', {
      email: user.email,
      password: user.password
    });
  }

}
