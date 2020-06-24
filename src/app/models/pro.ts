export class Pro {
  id: number;
  nom: string;
  prenom: string;
  nomGarage: string;
  numSiret: string;
  numTel: string;
  email: string;
  password: string;
  constructor(id?: number, nom?: string, prenom?: string, nomGarage?: string, numSiret?: string, numTel?: string, email?: string, password?: string)
  {
    this.id = id ;
    this.nom = nom;
    this.prenom = prenom;
    this.nomGarage = nomGarage;
    this.numSiret = numSiret;
    this.email = email;
    this.password = password;
    this.numTel = numTel;
  }
}
