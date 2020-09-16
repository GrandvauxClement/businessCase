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
  garages = [] ;
  cars = [];
  compteur = 0 ;
  proffesionel;
  constructor(private carService: CarService, private proService: ProService, private tokenService: TokenStorageService, private router:Router) { }

  ngOnInit() {
    this.proffesionel = this.tokenService.getUser();
    console.log(this.proffesionel.garages);
    this.getGarageByPro();
    console.log('je passe ici je recup l id pro '+this.proffesionel.id);
    for (let index = 0; index < this.proffesionel.garages.length; index++) {

      this.getCarByIdgarage(index, this.compteur);

      this.compteur += 1;
    }
    console.log('mes voitures par garages :'+this.cars);
  }
  getCarByIdgarage(index, compteur) {
    this.isLoading = true;
    // this.garages[index] = this.proService.getGarageByIdPro(this.proffesionel.id,this.proffesionel.garages[index]);
    console.log('garages: '+this.garages);
    return this.carService.getCarByIdgarage(this.proffesionel.garages[index]).subscribe((data: Car[]) => {
      this.cars[compteur] = data['hydra:member'];
      console.log(this.cars);
      this.isLoading = false;
    });
  }
  getGarageByPro() {
    this.isLoading = true;
    return this.proService.getGarageByIdPro(this.proffesionel.id).subscribe((data: Garages[]) => {
      this.garages = data['hydra:member'];
      console.log('mes garages trié : '+this.garages[1].nom);
      this.isLoading = false;
    })

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
