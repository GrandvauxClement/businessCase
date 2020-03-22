export class Pro {
  id: number;
  nom: string;
  numSiret: string;
  numTel: string;
  adresse: string;
  email: string;
  password: string;
  constructor(id?: number, nom?: string, numSiret?: string, numTel?:string, adresse?: string, email?: string, password?: string){
    this.id = id ;
    this.nom = nom;
    this.numSiret = numSiret;
    this.adresse = adresse;
    this.email = email;
    this.password = password;
    this.numTel = numTel;
  }
}
