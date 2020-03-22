import { CarService } from 'src/app/service/car.service';
import { Router } from '@angular/router';
import { Car } from './../../../models/car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carAdd = new Car();
  marques = ['Peugeot', 'Citroën', 'Dacia', 'Audi', 'Volkswagen', 'Ford', 'Renault', 'Suzuki'];
  carburants = ['Essence', 'Diesel', 'Electrique'];
  constructor(private router: Router, private carService: CarService) { }

  ngOnInit(): void {
    this.carAdd.dateAjout = new Date();
    this.carAdd.idClientContent = 1;
  }
  addCar() {
    this.carService.addCar(this.carAdd).subscribe((then => {
      this.router.navigate(['/pro-home']);
    }));
  }
}
