import { CarService } from 'src/app/service/car.service';
import { Router } from '@angular/router';
import { Car } from '../../../models/car';
import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {ProService} from "../../../service/pro.service";
import {Garages} from "../../../models/garages";
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UploadService} from "../../../service/upload.service";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carAdd = new Car();
  garageConnect = [];
  idPro : number;
  token: string;
  isLoading: boolean;
  marques = ['Peugeot', 'Citroën', 'Dacia', 'Audi', 'Volkswagen', 'Ford', 'Renault', 'Suzuki', 'BMW'];
  carburants = ['Essence', 'Diesel', 'Electrique'];
  selectedFile: File = null;
  apiUrl = 'http://127.0.0.1:8000/api';
  proffesionel;
  errorMessage = '';
  filesNames = [];
  countUpload : number;
  lastFile : string
  myFiles:string [] = [];
  constructor(private router: Router, private carService: CarService, private tokenStorage: TokenStorageService, private proService: ProService,
              private http :HttpClient, private uploadService:UploadService) { }

  ngOnInit() {
    this.token = this.tokenStorage.getToken();
    this.countUpload = 0;
    this.carAdd.images = [];
    this.proffesionel = this.tokenStorage.getUser();
    this.carAdd.dateAjout = new Date();
    this.idPro = this.tokenStorage.getUser().id;
    this.isLoading = true;
    return this.proService.getGarageByIdPro(this.idPro).subscribe((data) => {
      this.garageConnect = data['hydra:member'];
      console.log('mes garages: '+this.garageConnect);
      this.isLoading = false;
    });

  }

  onFileSelected(event) {
   /* for (var i = 0; i < event.target.files.length; i++) {

      this.lastFile = event.target.files[i].name

      console.log('Dans le file selected'+this.filesNames);
    }*/
    this.selectedFile = event.target.files[0] as File;
    this.lastFile = this.selectedFile.name;
    this.filesNames.push(event.target.files[0].name)
    this.onUpload();

  }

  onUpload() {

    this.isLoading = true;
    const uploadData = new FormData();
    console.log('Dans le OnUpload'+this.lastFile);
    uploadData.append('images', this.selectedFile, this.selectedFile.name);
    this.uploadService.addFile(this.token, uploadData)
      .subscribe((event: any) => {
        switch (event.type) {
          case 4:
            this.carAdd.images[this.countUpload] = event.body.file;
            this.countUpload += 1;
            console.log(this.carAdd.images);
            this.isLoading = false;
            break;
          default:
            break;
        }
      },err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      });
  }


  addCar() {
   /* for (let i = 0; i < this.myFiles.length; i++) {
      this.onUpload(i, this.myFiles[i]);
    }*/
    console.log('add car garages'+this.carAdd.garages);
    if (this.isLoading === false){
     // this.carAdd.garages = this.proffesionel.garages[0];
      this.carService.addCar(this.carAdd).subscribe((then => {
        this.router.navigate(['/pro-home']);
      }));
    }

  }
}
