import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-bapa';

  constructor() {
    var config = {
      apiKey: "AIzaSyBIBQAjZ4SflBzRLmyQhG02mZippuYvxxc",
      authDomain: "angular-bapa.firebaseapp.com",
      databaseURL: "https://angular-bapa.firebaseio.com",
      projectId: "angular-bapa",
      storageBucket: "angular-bapa.appspot.com",
      messagingSenderId: "367995680931"
    };
    firebase.initializeApp(config);
  }

}
