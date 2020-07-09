export class Car {
  id: number;
  marque: string;
  modele: string;
  carburant: string;
  annee: number;
  kilometrage: string;
  prix: number;
  image: string;
  imageCarousel: string[];
  idPro: number;
  dateAjout: Date;
  constructor( id?: number, marque?: string, modele?: string, carburant?: string, annee?: number, kilometrage?: string, prix?: number,
               image?: string, imageCarousel?: string[], idPro?: number, dateAjout?: Date ) {
    this.id = id ;
    this.marque = marque;
    this.modele = modele;
    this.carburant = carburant;
    this.annee = annee;
    this.kilometrage = kilometrage;
    this.prix = prix;
    this.image = image;
    this.imageCarousel = imageCarousel;
    this.idPro = idPro;
    this.dateAjout = dateAjout;
  }

}
