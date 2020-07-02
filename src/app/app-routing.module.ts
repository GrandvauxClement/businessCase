import { UpdateCarComponent } from './components/pro/update-car/update-car.component';
import { AddCarComponent } from './components/pro/add-car/add-car.component';
import { ProHomeComponent } from './components/pro/pro-home/pro-home.component';
import { CardsCarDetailsComponent } from './components/cards-car-details/cards-car-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NgbdModalComponent} from "./components/modal-login/modal-login.component";
import {AuthenticatorGuardService} from "./guards/authenticator.guard";


const routes: Routes = [
  {path: 'home', component: DashboardComponent},
  {path: 'car-detail/:id', component: CardsCarDetailsComponent},
  {path: 'login',component: NgbdModalComponent},
  {path: 'pro-home', component: ProHomeComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'add-car', component: AddCarComponent},
  {path: 'car-update/:id', component: UpdateCarComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
