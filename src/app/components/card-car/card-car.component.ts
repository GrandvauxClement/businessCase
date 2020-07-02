import { Car } from '../../models/car';
import { CarService } from '../../service/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrls: ['./card-car.component.css']
})
export class CardCarComponent implements OnInit {
  isLoading: boolean;
  cars: Car[];
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.isLoading = true;
    return this.carService.getCars().subscribe((data) => {
      this.cars = data['hydra:member'];
      console.log(this.cars);
      this.isLoading = false;
    });
  }

}
