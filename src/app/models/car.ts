export class Car {
  id: number;
  marque: string;
  modele: string;
  carburant: string;
  annee: number;
  kilometrage: string;
  prix: number;
  images: string[];
  garages: string;
  dateAjout: Date;
  description: string;
  constructor( id?: number, marque?: string, modele?: string, carburant?: string, annee?: number, kilometrage?: string, prix?: number,
               images?: string[], garages?: string, dateAjout?: Date, description?: string ) {
    this.id = id ;
    this.marque = marque;
    this.modele = modele;
    this.carburant = carburant;
    this.annee = annee;
    this.kilometrage = kilometrage;
    this.prix = prix;
    this.images = images;
    this.garages = garages;
    this.dateAjout = dateAjout;
    this.description = description;
  }

}
