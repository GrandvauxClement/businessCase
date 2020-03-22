import { UpdateCarComponent } from './components/pro/update-car/update-car.component';
import { AddCarComponent } from './components/pro/add-car/add-car.component';
import { ProHomeComponent } from './components/pro/pro-home/pro-home.component';
import { CardsCarDetailsComponent } from './components/cards-car-details/cards-car-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: DashboardComponent},
  {path: 'car-detail/:id', component: CardsCarDetailsComponent},
  {path: 'pro-home', component: ProHomeComponent},
  {path: 'add-car', component: AddCarComponent},
  {path: 'car-update/:id', component: UpdateCarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
