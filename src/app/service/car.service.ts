import { Car } from '../models/car';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiURL = 'http://127.0.0.1:8000/api/cars';
  apiUrlBis = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private router: Router, private http: HttpClient) {
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
  getCars(): Observable<any> {
    return this.http.get<Car[]>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getCarById(idCar: number): Observable<Car> {
    return this.http.get<Car>(this.apiURL + '/' + idCar)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getCarByIdgarage(garage:string): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrlBis + garage + '/cars')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getImagesByIdcar(idcar: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL +'/'+ idcar + '/images')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  addCar(carToAdd: Car): Observable<Car> {
    return this.http.post<Car>(this.apiURL, carToAdd, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  updateCar(carToUpdate: Car): Observable<Car> {
    return this.http.put<Car>(this.apiURL + '/' + carToUpdate.id, carToUpdate, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteCar(idCarToDelete: number): Observable<Car> {
    return this.http.delete<Car>(this.apiURL + '/' + idCarToDelete )
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


}
