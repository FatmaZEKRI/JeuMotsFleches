import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'mot-fleche';
  isAuth: boolean;

  constructor(private route: Router, private authService: AuthService) {
    var config = {
      apiKey: "AIzaSyD9o7vVV5xn0qxBMghMZnbK_WLsW5gnrnk",
      authDomain: "mot-fleche.firebaseapp.com",
      databaseURL: "https://mot-fleche.firebaseio.com",
      projectId: "mot-fleche",
      storageBucket: "mot-fleche.appspot.com",
      messagingSenderId: "840613191762"
    };
    firebase.initializeApp(config);
  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    }
    );
  }
  onSignOut() {
    this.authService.signOut();
  }
  genererGrille() {
    this.route.navigate(['/grille']);

  }
}
