import { Pro } from './../models/pro';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/internal/operators';
import {Car} from '../models/car';
import {Garages} from "../models/garages";

@Injectable({
  providedIn: 'root'
})
export class ProService {

  pros: Pro[];
  apiURL = 'http://127.0.0.1:8000/api/pros';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private router: Router, private http: HttpClient) {
  this.pros = [];
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getPro(): Observable<Pro[]> {
    return this.http.get<Pro[]>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getGarageByIdPro(idpro: number): Observable<Garages[]> {
    return this.http.get<Garages[]>(this.apiURL +'/'+idpro+'/garages')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAllUsers(token: string): Observable<Pro[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
    };
    return this.http.get<Pro[]>(this.apiURL , httpOptions);
  }

  addUser(token: string, user: Pro): Observable<Pro> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
    };
    return this.http.post<Pro>(this.apiURL , user, httpOptions);
  }

  deleteUser(token: string, user: Pro): Observable<Pro> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
    };
    return this.http.delete<Pro>(this.apiURL +'/'+ user.id, httpOptions);
  }

  getUserById(token: string, id: number): Observable<Pro> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
    };
    return this.http.get<Pro>(this.apiURL +'/'+ id, httpOptions);
  }

  editUser(token: string, user: Pro): Observable<Pro> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token})
    };
    return this.http.put<Pro>(this.apiURL +'/'+ user.id, user, httpOptions);
  }


}

