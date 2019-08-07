import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-mentorinfo',
  templateUrl: './mentorinfo.page.html',
  styleUrls: ['./mentorinfo.page.scss'],
})
export class MentorinfoPage implements OnInit {

	currentUser: any = {
		key: ''
	}

  constructor(
		private router: Router
	) { }

  ngOnInit() {
		firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				console.log(firebase.auth().currentUser.uid);
				firebase.database().ref("users/").orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("value", snapshot => {
					snapshot.forEach(data => {
						this.currentUser.key = data.key;
					})
				})
  		} else {
				this.router.navigate(['/signin']);
			}
		})
  }
}

