import { MotService } from './../services/mot.service';
import { GrilleService } from './../services/grille.service';
import { Grille } from './../models/grille.model';
import { Mot } from './../models/mot.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.scss']
})
export class GrilleComponent implements OnInit, OnDestroy {
  listMot: Mot[];
  grille: Grille ;
  grilleSubscription: Subscription;
  motsSubscription: Subscription;

  constructor(private motService: MotService, private grilleService: GrilleService, private router: Router) {
    console.log('test grille comp');
    this.motService = new MotService();
    this.grilleService =new GrilleService(this.motService);
    this.grille = this.grilleService.grille;
  }

  ngOnInit() {
    console.log('test grille comp');
    this.motsSubscription = this.motService.motsSubject.subscribe(
      (mots: Mot[]) => {
        this.listMot = mots;
      }
    );
    this.motService.emitMots();
    this.grilleSubscription = this.grilleService.grilleSubject.subscribe(
      (tab: any[]) => {
        this.grille.tab = tab ;
      }
    );
    this.grilleService.emitGrilleSubject();

    //this.grilleService.genererGrille((this.trieMot()));
  }
  trieMot():Mot[] {
    const trie = this.listMot.slice();
    trie.sort(function(m1: Mot, m2: Mot) {
      return m1.mot.length - m2.mot.length;
    });
    return trie;
  }
  genererGrille() {
    this.grilleService.genererGrille(this.trieMot());
    //console.log('affichage grille');
    console.table(this.grille.tab);
  }
 ngOnDestroy() {
   this.grilleSubscription.unsubscribe();
   this.motsSubscription.unsubscribe();
 }
}
