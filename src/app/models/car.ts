export class Car {
  id: number;
  marque: string;
  modele: string;
  carburant: string;
  annee: number;
  kilometrage: number;
  prix: number;
  image: string;
  imageCarousel: string[];
  idClientContent: number;
  dateAjout: Date;
  constructor( id?: number, marque?: string, modele?: string, carburant?: string, annee?: number, kilometrage?: number, prix?: number,
               image?: string, imageCarousel?: string[], idClientContent?: number, dateAjout?: Date ) {
    this.id = id ;
    this.marque = marque;
    this.modele = modele;
    this.carburant = carburant;
    this.annee = annee;
    this.kilometrage = kilometrage;
    this.prix = prix;
    this.image = image;
    this.imageCarousel = imageCarousel;
    this.idClientContent = idClientContent;
    this.dateAjout = dateAjout;
  }

}
