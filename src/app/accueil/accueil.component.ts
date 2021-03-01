import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Mot } from '../models/mot.model';
import { MotService } from '../services/mot.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit, OnDestroy {
  mots: Mot[];
  motSubscription: Subscription;
  @Input() motM: string;
  @Input() motDefinition: string;

  constructor(private motService: MotService, private router: Router) { }

  ngOnInit() {
    this.motSubscription = this.motService.motsSubject.subscribe(
      (mots: Mot[]) => {
        this.mots = mots;
      }
    );
    this.motService.getMots();
  }
  ajouterMot() {
    this.router.navigate(['/mots']);
  }
  supprimerMot(m: Mot) {
    this.motService.supprimerMot(m);
  }
  modifierMot() {
    this.motService.modifierMot();
  }
  gennerGrille() {
    this.router.navigate(['/grille']);
  }
  ngOnDestroy() {
    this.motSubscription.unsubscribe();
  }

}
