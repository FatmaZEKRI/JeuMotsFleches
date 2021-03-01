import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mot } from '../models/mot.model';
import * as firebase from 'firebase';

@Injectable()
export class MotService {
  mots: Mot[] = [];
  motsSubject = new Subject<Mot[]>();
  constructor() {
    this.getMots();
  }
  emitMots() {
    this.motsSubject.next(this.mots);
  }
  trieMot():Mot[] {
    const trie = this.mots;
    trie.sort(function(m1: Mot, m2: Mot) {
      return m1.mot.length - m2.mot.length;
    });
    return trie;
  }
  maxLengthMot(): number {
    const tab: Mot[] = this.trieMot();
    return tab[tab.length].mot.length;
  }
  saveMots() {
    firebase.database().ref('/mots').set(this.mots);
  }
  getMots() {
    firebase.database().ref('/mots')
    .on('value', ( data ) => {
      this.mots = data.val() ? data.val() : [];
      this.emitMots();
    });
  }
  getMot(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/mots/' + id).once('value').then(
          (data) => {
            resolve(new Mot().deserialize(data.val()));
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  ajouterNouvMot(nouvmot: Mot) {
    this.mots.push(nouvmot);
    this.saveMots();
    this.emitMots();
  }
  supprimerMot(m: Mot) {
    const motIndexToRemove = this.mots.findIndex(
      (mot) => {
        if ( mot === m ) {
          return true;
        }
      });
    this.mots.splice(motIndexToRemove, 1);
    this.saveMots();
    this.emitMots();
  }
  modifierMot() {
    this.saveMots();
    this.emitMots();
  }
}
