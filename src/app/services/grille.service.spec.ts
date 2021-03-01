import { TestBed } from '@angular/core/testing';
import { GrilleService } from './grille.service';
import { Mot } from '../models/mot.model';
import { from } from 'rxjs';

describe('GrilleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let m = new Mot('bonbon', 'fjh,');
  let n = new Mot('bougie', 'fsdzey');
  let x = new Mot('service', 'rfesd');
  let y = new Mot('classe', 'frsdfs');
  const list: Mot[] = [];
  list.push(n);

  list.push(y);
  list.push(new Mot('mot', 'gdfjg'));
  list.push(m);
  list.push(x);
  //list.push(new Mot('grille', 'tregred'));
  //list.push(new Mot('label', 'feds'));
  list.push(new Mot('test', 'eriezur'));
  list.push(new Mot('resulat', 'rzetzet'));
  console.table(list);
  let indice: any[] = [];

  it('should be created', () => {
    const service: GrilleService = TestBed.get(GrilleService);
    let tab: any[] = [];
    let resultat: boolean;
    service.newGrille();
    /*service.placerPremierMot(x);
    for (let i = 0; i < m.mot.length; i++) {
        console.log(service.grille.tab[i][0]);
    }
    tab = service.indiceLettreGrille('c');
    console.log(tab[0]);
    resultat = service.placerUnMot(y, tab[0]);
    console.log(resultat);*/
    service.genererGrille(list);
    service.afficherGrille();
    expect(service).toBeTruthy();
  });
});
