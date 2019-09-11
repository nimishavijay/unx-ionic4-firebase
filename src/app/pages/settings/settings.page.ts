import { Component, OnInit } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})


export class SettingsPage implements OnInit {

	type: string
	currentUser: string;
	currentEmail: string;

  constructor(
		private router: Router,
		private location: Location,
		public toastController: ToastController,
		private platform: Platform
	) {	
			firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				this.currentUser = firebase.auth().currentUser.uid;
				this.currentEmail = firebase.auth().currentUser.email;
				firebase.database().ref("users/" + this.currentUser + "/currentState").on("value", snapshot => {
					this.type = snapshot.val();
				})
				console.log("type: ", this.type);
  		} else {
				this.router.navigate(['/signin']);
			}
		})
	 }

  ngOnInit() {
		console.log("---SETTINGS---");
	/* 	firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				this.currentUser = firebase.auth().currentUser.uid;
				this.currentEmail = firebase.auth().currentUser.email;
				firebase.database().ref("users/" + this.currentUser + "/currentState").on("value", snapshot => {
					this.type = snapshot.val();
				})
				console.log("type: ", this.type);
  		} else {
				this.router.navigate(['/signin']);
			}
		}) */
	}

	setType(type: string) {
		firebase.database().ref('users/' + this.currentUser + '/' +  type).set(true);
		firebase.database().ref('users/' + this.currentUser + '/currentState').set(type)
		.then(() => {
			console.log("set current user type to: ", type);
		})
	}
/* 
	backButtonEvent() {
		this.platform.backButton.subscribe(async () => {
			this.location.back();
		})
	} */

	goBack() {
		this.presentToast("Your changes have been saved");

		// this.platform.backButton.subscribe(async () => {
			this.location.back();
		// })
	}
	
	viewProfile() {
		console.log('navigate to /profile');
		// this.router.navigate(['/profile']);
	}

	goToMentorSettings() {
		console.log('navigate to /mentor');
		// this.router.navigate(['/mentor']);
	}

	goToMenteeSettings() {
		console.log('navigate to /mentee');
		// this.router.navigate(['/mentee']);
	}

	goToAccount() {
		console.log("navigate to /account");
		this.router.navigate(['/account']);
}

	goToAbout() {
		console.log("navigate to /about");
		// this.router.navigate(['/about']);
	}

	goToHelp() {
		console.log("navigate to /help");
		// this.router.navigate(['/help']);
	}

	private async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

}
