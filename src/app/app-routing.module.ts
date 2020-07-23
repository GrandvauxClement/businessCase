import { UpdateCarComponent } from './components/pro/update-car/update-car.component';
import { AddCarComponent } from './components/pro/add-car/add-car.component';
import { ProHomeComponent } from './components/pro/pro-home/pro-home.component';
import { CardsCarDetailsComponent } from './components/cards-car-details/cards-car-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NgbdModalComponent} from "./components/modal-login/modal-login.component";
import {AuthenticatorGuardService} from "./guards/authenticator.guard";
import {MentionslegaleComponent} from "./components/reglementation/mentionslegale/mentionslegale.component";
import {ProListComponent} from "./components/pro/pro-management/pro/pro-list/pro-list.component";
import {EditProComponent} from "./components/pro/pro-management/pro/edit-pro/edit-pro.component";
import {AddProComponent} from "./components/pro/pro-management/pro/add-pro/add-pro.component";


const routes: Routes = [
  {path: 'home', component: DashboardComponent},
  {path: 'car-detail/:id', component: CardsCarDetailsComponent},
  {path: 'login',component: NgbdModalComponent},
  {path: 'mention-legale', component: MentionslegaleComponent},
  {path: 'pro-home', component: ProHomeComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'add-car', component: AddCarComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'car-update/:id', component: UpdateCarComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'pro-management', component: ProListComponent,canActivate: [AuthenticatorGuardService] },
  {path: 'add-pro', component: AddProComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'edit-pro/:id', component: EditProComponent, canActivate: [AuthenticatorGuardService]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
