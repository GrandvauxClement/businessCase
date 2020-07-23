import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public apiUrl = 'http://localhost:8000/api/';
  token: string;
  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token

    }),
  }

  constructor(private tokenStorage: TokenStorageService, private http: HttpClient) {
    this.token = this.tokenStorage.getToken();
  }

  addFile(token: string, uploadData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'voitures/upload', uploadData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      }),
      reportProgress: true,
      observe: 'events',
    });
  }

}
