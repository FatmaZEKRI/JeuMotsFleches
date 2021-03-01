import { Router } from '@angular/router';
import { Mot } from './../models/mot.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MotService } from '../services/mot.service';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-list-mot',
  templateUrl: './list-mot.component.html',
  styleUrls: ['./list-mot.component.scss']
})
export class ListMotComponent implements OnInit, OnDestroy {
  listMot: Mot[];
  motsSubscription: Subscription;
  formGroup: FormGroup;
  formArray: FormArray;
  constructor(private motService: MotService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.motsSubscription = this.motService.motsSubject.subscribe(
      (mots: Mot[]) => {
        this.listMot = mots.slice();
      }
    );

    this.motService.emitMots();
    this.initForm();
  }
  initForm() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([this.creerList()])
    });
  }
  creerList(): FormGroup {
    return this.formBuilder.group({
      mot: ['', Validators.required],
      definition: ['', Validators.required]
    });
  }
  getList() {
    return this.formGroup.get('formArray') as FormArray;
  }
  addList() {
    this.formArray = this.getList();
    this.formArray.push(this.creerList());

  }
  supprimerMot(m: Mot) {
    this.motService.supprimerMot(m);
  }
  onSubmitForm() {
    const formValue = this.formGroup.value;
    let tabMot: Mot[] = [];
    tabMot = formValue['formArray'];
    for ( let i = 0; i < tabMot.length; i++) {
      this.motService.ajouterNouvMot(tabMot[i]);
    }
    this.router.navigate(['/accueil']);
  }
  retourAccueil() {
    this.router.navigate(['/accueil']);
  }
  ngOnDestroy() {
    this.motsSubscription.unsubscribe();
  }

}
