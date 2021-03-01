import { Mot } from './../models/mot.model';
import { Grille } from './../models/grille.model';
import { MotService } from './mot.service';
import { Injectable } from '@angular/core';
import { and } from '@angular/router/src/utils/collection';
import { isNull, puts } from 'util';
import { literal } from '@angular/compiler/src/output/output_ast';
import { generate, Subject } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ListMotComponent } from '../list-mot/list-mot.component';

@Injectable()

export class GrilleService {
  grille: Grille;
  grilleSubject = new Subject<any[]>();
  constructor() {
    this.newGrille( 2 );
  }
  emitGrilleSubject() {
    this.grilleSubject.next(this.grille.tab.slice());
  }

  placerPremierMot(mot: Mot) {
    for ( let i = 0; i < mot.mot.length; i ++) {
      this.grille.tab[i][6] = mot.mot[i];
    }
    this.emitGrilleSubject();
  }
  //decomposer un mot en tab de lettres
  decomMot(lettre: any, m: Mot): string[] {
    const index = m.mot.indexOf(lettre);
    const tab: string[] = [];
    tab[0] = m.mot.substring(0, index);
    tab[1] = m.mot.substring(index + 1, m.mot.length);
    return tab;
  }

  //Test de position
  testPositionHoriz1(split: string, x: number, y: number): boolean {
    let result = true;
    console.log('testposihoriz1', split);
    ///ici//
    for ( let i = 1; i < split.length ; i++ ) {
      if (this.grille.tab[x][y - i])
        {
          result = false;
        }
      if (result === false) {
        break;
      }
    }
    console.log(result);
    return result;
  }

  testPositionHorz2(split: string, x: number, y: number): boolean {
    let result = true;
    console.log('testHoriz2');
    for ( let j = 0 ; j < split.length - 1 ; j++ ) {
      if (this.grille.tab[x][y + j + 1 ]) {
        result = false;
      }
      if (result === false)
      { break;
      }
    }
    console.log(result);
    return result;
  }
  testPositionVerti1(split: string, x: number, y: number ) {
    let result = true;
    console.log('testVeerti1', split);
    for ( let i = 0; i < split.length ; i++ ) {
      if ( this.grille.tab[x - i][y] ) {

        result = false;
      }
      if (result === false) {
        break;
      }
    }
    console.log('testvert1', result);
    return result;

  }
  testPositionVerti2(split: string, x: number, y: number ): boolean {
    let result = true;
    console.log('testVerti2');
    console.log(split);
    console.log(x , y);
   // if(x + split.length > this.sizeGrille)
    for (let j = 0 ; j < split.length - 1 ; j++ ) {
      if ( this.grille.tab[x + j + 1][y] ) {
        result = false;
      }
      if (result === false) {
        break;
      }
    }
    console.log(result);
    return result;
  }
  //Placer un mot dans la grille
  placerUnMot(mot: Mot, tab: any[]): boolean {
    const l = tab[0];
    const x = tab[1];
    const y = tab[2];
    let split = mot.mot.split(l);
    if (split.length > 2) {
      split = this.decomMot(l, mot);
    }
    console.log(mot.mot);
    if ( (split[1] === '') && (this.testPositionHoriz1(split[0] , x, y)) ) {
      for ( let j = split[0].length - 1; j >= 0; j-- ) {
        //console.log(split[0][j] );
        this.grille.tab[x][y - j + 1] = split[0][j];
      }
      return true;
    } else
    if ( (split[1] === '') && (this.testPositionHorz2(split[0], x, y)) ) {
      for ( let j = split[0].length - 1; j >= 0; j-- ) {
        console.log(split[0][j] );
        this.grille.tab[x][y + split[0].length - j ] = split[0][j];
      }
      return true;
    } else
   if ((split[1] === '') && (this.testPositionVerti1(split[0], x, y))) {
      for ( let i = 0; i < split[0].length; i++) {
        this.grille.tab[x - split[0].length + i][y] = split[0][i];
      }
      return true;
    } else
    if ( (split[1] === '') && (this.testPositionVerti2(split[0], x, y))) {
      console.log('test splt1 :vide splt0  ');
      for ( let i = 0; i < split[0].length; i++) {
        this.grille.tab[x + split[0].length - i][y] = split[0][i];
      }
      return true;
    } else
    if ( (split[0] === '') && (this.testPositionHoriz1(split[1], x, y))) {
      for ( let i = 0; i < split[1].length; i++) {
        this.grille.tab[x][y - i - 1 ] = split[1][i];
      }
      return true;
    } else
    if ( (split[0] === '') && (this.testPositionHorz2(split[1], x, y))) {
      for ( let i = 0; i < split[1].length; i++) {
        this.grille.tab[x][y + i + 1 ] = split[1][i];
      }
      return true;
    } else
    if ( (split[0] === '') && (this.testPositionVerti1(split[1], x, y))) {
      for ( let i = 0; i < split[1].length; i++) {
        this.grille.tab[x - i - 1 ][y] = split[1][i];
      }
      return true;
    } else
    if ((split[0] === '') && (this.testPositionVerti2(split[1], x, y ))) {
      console.log('test spl0 spl1:posVer2 ');
      for (let j = split[1].length - 1; j >= 0; j-- ) {
        this.grille.tab[x + j + 1][y] = split[1][j];
        //console.log(this.grille.tab[x + j - 1][y]);
      }
      //console.log('ici');
      return true;
    } else
    if ( this.testPositionHoriz1(split[0], x, y) && this.testPositionHorz2(split[1], x, y) ) {
     // console.log('testHori1 sp0 et Hori2 sp1 ');
      for ( let i = 0; i < split[0].length ; i++ ) {
        this.grille.tab[x][y - split[0].length + i] = split[0][i];
      }
      for ( let j = split[1].length - 1; j >= 0; j -- ) {
        this.grille.tab[x][y + j + 1] = split[1][j];
      }
      return true;
    } else
    if ( this.testPositionHoriz1(split[1], x, y) && this.testPositionHorz2(split[0], x, y) ) {
      console.log('testHori1 sp1 et Hori2 sp0');
      for ( let i = split[1].length - 1; i >= 0; i-- ) {
        this.grille.tab[x][y - i - 1] = split[1][i];
      }
      for ( let j = split[0].length - 1; j >= 0; j -- ) {
        this.grille.tab[x][y + j + 1] = split[0][j];
      }
      return true;
    } else
    if (this.testPositionVerti1(split[1], x, y) && this.testPositionVerti2(split[0], x, y)) {
      console.log('vert1 sp1 et vetr2 sp 0 ');
      for ( let i = split[1].length - 1; i >= 0; i-- ) {
          this.grille.tab[x - i - 1 ][y] = split[1][i];
        }
      for (let j = split[0].length - 1; j >= 0; j-- ) {
        this.grille.tab[x + j + 1][y] = split[0][j];
      }
      return true;
    } else
    if (this.testPositionVerti1(split[0], x, y) && this.testPositionVerti2(split[1], x, y)) {
      console.log('vert1 sp0 et vetr2 sp 1 ');
      for ( let i = split[0].length - 1 ; i >= 0; i-- ) {
          this.grille.tab[x - i  - 1][y] = split[0][i];
        }
      for (let j = split[1].length - 1; j >= 0; j-- ) {
        this.grille.tab[x + j + 1][y] = split[1][j];
      }
      return true;
    } else { return false; }
    this.emitGrilleSubject();
  }

  sizeGrille() {

  }

  newGrille(taille: number) {
    this.grille = new Grille(taille);
    this.grille.sizeGrille = taille;
    //console.log(this.grille.sizeGrille);
  }
  // récuperer les indices d'occurence d'une lettre dans la grille
  indiceLettreGrille(lettre: any): any[] {
    let indice: any[] = [];
    for (let i = 0; i < this.grille.sizeGrille; i++) {
      for ( let j = 0 ; j < this.grille.sizeGrille; j++) {
        if ( this.grille.tab[i][j] === lettre) {
          indice.push([lettre, i, j]);
        }
      }
    }
    return indice;
  }
  // placer une liste de mot dans la grille
  placerListMotGrille(listM: Mot[]) {
    let tab: any[] = [];
    const mo = listM.pop();
    for ( let j = 0; j < mo.mot.length; j++ ) {
       tab = tab.concat(this.indiceLettreGrille(mo.mot[j]));
    }
   // console.log(mo);
    //console.table('test tab', tab);
    let result = false;
    if (tab.length > 0 ) {
      for ( let j = 0; j < tab.length; j++ ) {
        result = this.placerUnMot(mo, tab[j]);
        if (result === true) {
          this.grille.listMot.push(mo);
          console.log('mot dans la grille ', this.grille.listMot);
          break;
        }
      }
    }
    if ( ( result === false ) || (tab.length === 0)) {
      //console.log(result, ' ', mo);
      //console.log(listM.length);
      listM.splice(0, 0, mo);
      console.log(mo);
      console.log('list de mot ', listM);
      }
    if ( listM.length > 0) {
      let i = 0;
      while ( this.grille.listMot.length < 7 ) {
        console.table('test listM', listM);
        this.placerListMotGrille(listM);
        //console.log('mot dans la grille ', this.grille.listMot);
        i = i + 1;
      }
    }
    this.emitGrilleSubject();
  }
  genererGrille(listM: Mot[]) {
    const list = listM.slice();
    const a = list.pop();
    this.newGrille(a.mot.length);
    this.placerPremierMot(a);
    this.grille.listMot.push(a);
    this.placerListMotGrille(list);
    console.log(this.grille.listMot);
    this.emitGrilleSubject();
  }
}
