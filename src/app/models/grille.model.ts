import { Mot } from './mot.model';
import { stringify } from 'querystring';
export class Grille {
  tab: any[][] ;
  listMot: Mot[] = [];
  constructor(public sizeGrille: number) {
    this.tab = new Array(this.sizeGrille);
    for ( let i = 0; i < this.sizeGrille; i++) {
      this.tab[i] = new Array(this.sizeGrille);
    }
   }

}
