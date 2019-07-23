import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

	currentUser = {
		key: '',
		name: ''
	};

	name: string;
	email: string;
	password: string;

  constructor(
		private router: Router
	) { }

  ngOnInit() {
		console.log("--- ACCOUNT SETTINGS---");
		firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				this.currentUser.key = firebase.auth().currentUser.uid;
				this.currentUser.name = firebase.auth().currentUser.displayName;
  		} else {
				this.router.navigate(['/signin']);
			}
		})
  }

}
