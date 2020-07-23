export class Pro {
  id: number;
  nom: string;
  prenom: string;
  nomGarage: string;
  garagesId: number;
  numTelephone: string;
  email: string;
  password: string;
  roles: [];
  constructor(id?: number, nom?: string, prenom?: string, nomGarage?: string, numSiret?: string, numTelephone?: string, email?: string, password?: string, garagesId?:number)
  {
    this.id = id ;
    this.nom = nom;
    this.prenom = prenom;
    this.nomGarage = nomGarage;
    this.garagesId = garagesId;
    this.email = email;
    this.password = password;
    this.numTelephone = numTelephone;
  }
}
