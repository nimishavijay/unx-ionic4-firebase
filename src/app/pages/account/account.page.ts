import { Component, OnInit, OnDestroy } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AlertController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

	currentUser = {
		key: '',
		name: '',
		email:''
	};

	name: string ;
	email: string;
	password: string;

  constructor(
		private router: Router,
		private alertController: AlertController,
		private location: Location,
		private toastController: ToastController
	) { }

  ngOnInit() {
		console.log("-- ACCOUNT SETTINGS---");
		firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				this.currentUser.key = firebase.auth().currentUser.uid;
				this.currentUser.name = firebase.auth().currentUser.displayName;
				this.currentUser.email = firebase.auth().currentUser.email;
				console.log(this.currentUser);
  		} else {
				this.router.navigate(['/signin']);
			}
		})
  }

	ngOnDestroy() {
		console.log("---DESTROY---");
		this.name = this.currentUser.name;
		this.email = this.currentUser.email;
		this.password = '';
	}

	goBack() {
		this.location.back();
		// this.router.navigate(['/settings']);
	}

	async save() {
		if (this.name !== undefined && this.name !== this.currentUser.name) {
			console.log(`updating username from ${this.currentUser.name} to ${this.name}`);
			await firebase.auth().currentUser.updateProfile({
				displayName: this.name,
				photoURL: null
			}).then(async () => {
				firebase.database().ref("users/").orderByChild("uid").equalTo(this.currentUser.key).on("value", query => {
						query.forEach(data => {
							data.ref.child("username").set(this.name);
						})
					})
				console.log('successfully updated username')
				this.presentToast("Successfully updated username");
			})
		}
		if (this.email !== undefined && this.email !== this.currentUser.email) {
			console.log("updating email");
			var credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, this.password)
			await firebase.auth().currentUser.reauthenticateWithCredential(credential);
			await firebase.auth().currentUser.updateEmail(this.email).then(async () => {
				firebase.database().ref("users/").orderByChild("uid").equalTo(this.currentUser.key).on("value", query => {
					query.forEach(data => {
						data.ref.child("email").set(this.email);
					})
				})
				this.presentToast("Successfully updated email");
			})
		}
		this.goBack();
	}

	changePassword() {
		this.router.navigate(['/password']);
	}

	private async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }
}

