import { ProService } from '../../../service/pro.service';
import { Pro } from '../../../models/pro';
import { Car } from '../../../models/car';
import { CarService } from '../../../service/car.service';
import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";

@Component({
  selector: 'app-pro-home',
  templateUrl: './pro-home.component.html',
  styleUrls: ['./pro-home.component.css']
})
export class ProHomeComponent implements OnInit {
  idclientContent = 1;
  isLoading: boolean;
  cars;
  proffesionel;
  constructor(private carService: CarService, private proService: ProService, private tokenService: TokenStorageService) { }

  ngOnInit() {
    this.proffesionel = this.tokenService.getUser();
    console.log(this.proffesionel);
    this.getCarByIdgarage();
  }
  getCarByIdgarage() {
    this.isLoading = true;
    return this.carService.getCarByIdgarage(this.proffesionel.garages[0].id).subscribe((data: Car[]) => {
      this.cars = data['hydra:member'];
      console.log(this.cars)
      this.isLoading = false;
    });
  }
  getPro() {
    this.isLoading = true;
    return this.tokenService.getUser().subscribe((data) => {
      this.proffesionel = data;
      this.isLoading = false;
  });
  }

  deleteCar(IdcarToDelete: number): void {
    this.isLoading = true;
    this.carService.deleteCar(IdcarToDelete).subscribe(then => {
      this.carService.getCarByIdgarage(this.idclientContent).subscribe((data: Car[]) => {
        this.cars = data;
        this.isLoading = false;
      });
    });
  }

  logOut() {
    this.tokenService.logOut();

  }

}
