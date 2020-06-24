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
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CollapseModule} from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbdModalComponent } from './components/modal-login/modal-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    NgbdModalComponent
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
    BsDropdownModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
