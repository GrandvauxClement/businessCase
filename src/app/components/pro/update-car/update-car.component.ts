import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/service/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  idCar: number;
  carUpdate: Car;
  isLoading: boolean;
  marques = ['Peugeot', 'Citroën', 'Dacia', 'Audi', 'Volkswagen', 'Ford', 'Renault', 'Suzuki'];
  carburants = ['Essence', 'Diesel', 'Electrique'];
  constructor(private route: ActivatedRoute, private carService: CarService, private router: Router) { }

  ngOnInit(): void {
    this.idCar = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.carService.getCarById(this.idCar).subscribe((data: Car) => {
      this.carUpdate = data;
      this.isLoading = false;
    });
  }
  updateCar() {
    return this.carService.updateCar(this.carUpdate).subscribe((then => {
      this.router.navigate(['/pro-home']);
    }));
  }

}
