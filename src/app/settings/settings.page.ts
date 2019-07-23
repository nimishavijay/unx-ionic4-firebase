import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})


export class SettingsPage implements OnInit {

	type: string
	currentUser = {
		key: '',
		name: ''
	};

  constructor(
		private router: Router
	) {	 }

  ngOnInit() {
		console.log("---SETTINGS---");
		firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
			firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', snapshot => {
				snapshot.forEach((data) => {
					this.currentUser.name = data.val().username;
					this.currentUser.key =  data.key;
					this.type = data.val().currentState;
					console.log(this.currentUser.key);
					})
				})
				console.log("type: ", this.type);
  		} else {
				this.router.navigate(['/signin']);
			}
		})
	}
	
	setType(type: string) {
		firebase.database().ref('users/' + this.currentUser.key).child('currentState').set(type)
		.then(() => {
			console.log("set current user type to: ", type);
		})
	}

	goToMentorSettings() {
		console.log('navigate to /mentor');
	}

	goToMenteeSettings() {
		console.log('navigate to /mentee');
	}

	goToAccount() {
	console.log("navigate to /account");
		// this.router.navigate(['/account']);
}

	goToAbout() {
		console.log("navigate to /about");
		// this.router.navigate(['/about']);
	}

	goToHelp() {
		console.log("navigate to /help");
		// this.router.navigate(['/help']);
	}

	goBack() {
		this.router.navigate(['/room']);
	}

}
