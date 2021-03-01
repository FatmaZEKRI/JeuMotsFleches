
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { GrilleService } from './services/grille.service';
import { MotService } from './services/mot.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrilleComponent } from './grille/grille.component';
import { TabGrilleComponent } from './tab-grille/tab-grille.component';
import { ListMotComponent } from './list-mot/list-mot.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HttpClientModule} from '@angular/common/http';
import { AccueilComponent } from './accueil/accueil.component';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'accueil', canActivate: [AuthGuardService], component: AccueilComponent},
  {path: 'grille', canActivate: [AuthGuardService], component: GrilleComponent},
  {path: 'mots', canActivate: [AuthGuardService] , component: ListMotComponent},
  {path: '', redirectTo: 'mots', pathMatch: 'full'},
  {path: '**', redirectTo: 'mots'}
];

@NgModule({
  declarations: [
    AppComponent,
    GrilleComponent,
    TabGrilleComponent,
    ListMotComponent,
    SignupComponent,
    SigninComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MotService,
    GrilleService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
