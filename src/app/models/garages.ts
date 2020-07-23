export class Garages {

  id: number;
  nom: string;
  rue: string;
  codePostal: string;
  ville: string;
  numTel: string;
  numSiret: string;
  email: string;
  password: string;
  roles: [];

  constructor(id?: number, nom?: string, rue?: string, codePostal?: string, numSiret?: string,
              ville?:string, numTel?: string)
  {
    this.id = id ;
    this.nom = nom;
    this.rue = rue;
    this.codePostal = codePostal;
    this.ville = ville;
    this.numSiret = numSiret;
    this.numTel = numTel;
  }


}
