import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-cards-car-details',
  templateUrl: './cards-car-details.component.html',
  styleUrls: ['./cards-car-details.component.css']
})
export class CardsCarDetailsComponent implements OnInit {
  idCar: number;
  car: Car;
  isLoading: boolean;
  constructor(private route: ActivatedRoute, private carService: CarService) { }

  ngOnInit(): void {
    this.idCar = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.carService.getCarById(this.idCar).subscribe((data: Car) => {
      this.car = data;
      this.isLoading = false;
    });
  }

}
