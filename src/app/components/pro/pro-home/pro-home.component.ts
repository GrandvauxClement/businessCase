import { ProService } from '../../../service/pro.service';
import { Pro } from '../../../models/pro';
import { Car } from '../../../models/car';
import { CarService } from '../../../service/car.service';
import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {Router} from "@angular/router";
import {Garages} from "../../../models/garages";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pro-home',
  templateUrl: './pro-home.component.html',
  styleUrls: ['./pro-home.component.css']
})
export class ProHomeComponent implements OnInit {
  idclientContent = 1;
  isLoading: boolean;
  garages ;
  cars;
  proffesionel;
  constructor(private carService: CarService, private proService: ProService, private tokenService: TokenStorageService, private router:Router) { }

  ngOnInit() {
    this.proffesionel = this.tokenService.getUser();
    console.log(this.proffesionel);
    this.getCarByIdgarage();
    console.log('l email :'+this.proffesionel.email)
  }
  getCarByIdgarage() {
    this.isLoading = true;
    this.garages = this.proService.getGarageByIdPro(this.proffesionel.id,this.proffesionel.garages[0]);
    console.log('garages: '+this.garages);
    return this.carService.getCarByIdgarage(this.proffesionel.garages[0]).subscribe((data: Car[]) => {
      this.cars = data['hydra:member'];
      console.log(this.proffesionel.garages[0])
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
      this.carService.getCarByIdgarage(this.proffesionel.garages[0]).subscribe((data: Car[]) => {
        this.cars = data['hydra:member'];
        this.isLoading = false;
      });
    });
  }

  logOut() {
    this.tokenService.logOut();

  }

}
