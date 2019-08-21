import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
	currentUser = {
		key: '',
		name: ''
	};

  constructor(
		private router: Router,
		private location: Location,
		public toastController: ToastController
	) {	 }

  ngOnInit() {
		console.log("---SETTINGS---");
		firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
			await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', snapshot => {
				snapshot.forEach((data) => {
					// this.currentUser.name = data.val().username;
					this.currentUser.key =  data.key;
					this.type = data.val().currentState;
					console.log("Current user: ", this.currentUser.key);
					})
				})
				console.log("type: ", this.type);
  		} else {
				this.router.navigate(['/signin']);
			}
		})
	}

	setType(type: string) {
		firebase.database().ref('users/' + this.currentUser.key + '/' +  type).set(true);
		firebase.database().ref('users/' + this.currentUser.key + '/currentState').set(type)
		.then(() => {
			console.log("set current user type to: ", type);
		})
	}

	goBack() {
		this.presentToast("Your changes have been saved");
		this.location.back();
		// this.router.navigate(['/menteehome']);
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
