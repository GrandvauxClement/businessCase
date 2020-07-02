import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;
  durationInSeconds = 5;

  constructor(private router: Router, private matPopup: MatSnackBar) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, errors: any[]) {
    let errorString = '';
    if (errors){
      errors.forEach(
        (err: any) =>
          err.forEach(
            (er: any) =>
              errorString += 'Erreur : ' + er.message
          )
      );
    }


    this.matPopup.open(message, errorString, {

      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: this.durationInSeconds * 1000,
    });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next();
  }
}
