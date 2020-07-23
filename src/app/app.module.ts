import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardsCarDetailsComponent } from './components/cards-car-details/cards-car-details.component';
import { CardCarComponent } from './components/card-car/card-car.component';
import {HttpClientModule} from '@angular/common/http';
import { ProHomeComponent } from './components/pro/pro-home/pro-home.component';
import { FormsModule} from '@angular/forms';
import { NavsideComponent } from './components/pro/navside/navside.component';
import { AddCarComponent } from './components/pro/add-car/add-car.component';
import { UpdateCarComponent } from './components/pro/update-car/update-car.component';
import { ConfirmDialogComponent} from "./components/pro/pro-management/confirm-dialog/confirm-dialog.component";
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CollapseModule} from 'ngx-bootstrap';
import { NgbdModalComponent } from './components/modal-login/modal-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {JwtModule} from "@auth0/angular-jwt";
import {AuthenticatorGuardService} from "./guards/authenticator.guard";
import {authInterceptorProviders} from "./_helpers/authenticator.interceptor";
import { MentionslegaleComponent } from './components/reglementation/mentionslegale/mentionslegale.component';
import { ProListComponent } from './components/pro/pro-management/pro/pro-list/pro-list.component';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorIntlFr } from 'src/app/components/pro/pro-management/matPaginatorIntlFrClass';
import { ForbiddenValidatorDirective } from 'src/app/components/pro/pro-management/shared/forbidden-name.directive';
import { RoleGuardService } from 'src/app/guards/role.guard.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EditProComponent } from './components/pro/pro-management/pro/edit-pro/edit-pro.component';
import { AddProComponent } from './components/pro/pro-management/pro/add-pro/add-pro.component';
 //import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

export function getToken() {
  return localStorage.getItem('auth-token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    CardsCarDetailsComponent,
    CardCarComponent,
    ProHomeComponent,
    NavsideComponent,
    AddCarComponent,
    UpdateCarComponent,
    NgbdModalComponent,
    MentionslegaleComponent,
    ProListComponent,
    ConfirmDialogComponent,
    EditProComponent,
    AddProComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    CommonModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    NgbModule,
    JwtModule.forRoot({ config: {
        tokenGetter: getToken
      }}),
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthenticatorGuardService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
