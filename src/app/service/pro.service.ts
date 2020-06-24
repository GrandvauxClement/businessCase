import { Pro } from './../models/pro';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/internal/operators';
import {Car} from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class ProService {

  pros: Pro[];
  apiURL = 'http://localhost:3000/pro';
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


}

