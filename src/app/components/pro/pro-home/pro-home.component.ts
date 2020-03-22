import { ProService } from './../../../service/pro.service';
import { Pro } from './../../../models/pro';
import { Car } from './../../../models/car';
import { CarService } from './../../../service/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro-home',
  templateUrl: './pro-home.component.html',
  styleUrls: ['./pro-home.component.css']
})
export class ProHomeComponent implements OnInit {
  idclientContent = 1;
  isLoading: boolean;
  cars: Car[];
  proffesionel: Pro[];
  constructor(private carService: CarService, private proService: ProService) { }

  ngOnInit() {
    this.getCarByIdgarage();
    this.getPro();
  }
  getCarByIdgarage() {
    this.isLoading = true;
    return this.carService.getCarByIdgarage(this.idclientContent).subscribe((data: Car[]) => {
      this.cars = data;
      this.isLoading = false;
    });
  }
  getPro() {
    this.isLoading = true;
    return this.proService.getPro().subscribe((data: Pro[]) => {
      this.proffesionel = data;
      this.isLoading = false;
  });
  }

}
