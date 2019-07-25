import { Component, OnInit, OnDestroy } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AlertController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit, OnDestroy {

	old: string;
	newpw: string;
	confirm: string;
	
	currentUser

  constructor(
		private alertController: AlertController,
		private toastController: ToastController,
		private router: Router
	) { }

  ngOnInit() {
		console.log("---CHANGE PASSWORD	---");
		this.old = '';
		this.newpw = '';
		this.confirm = '';
		firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				console.log(firebase.auth().currentUser.uid);
  		} else {
				this.router.navigate(['/signin']);
			}
		})
  }

	ngOnDestroy() {
		console.log("---DESTROY---");
		this.old = '';
		this.newpw = '';
		this.confirm = '';
	}

	goBack() {
		this.router.navigate(['/settings']);
	}

	async save() {
		try {
			if (this.old !== '') {
				console.log("updating password");
				var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, this.old)
				await firebase.auth().currentUser.reauthenticateWithCredential(credential).then(() => console.log("reauth"));
				if (this.newpw === this.confirm) {
					await firebase.auth().currentUser.updatePassword(this.newpw)
						.then(() => {
							console.log('successfully updated password')
							this.presentToast("Successfully updated password");
							this.goBack();
						})
						.catch(async error => {
							const alert = await this.alertController.create({
				    	  header: 'Error',
				    	  message: error.message,
				    	  buttons: ['OK']
  	  		  	});
  	  				alert.present();
						})
				} else throw new Error ("Passwords do not match"); 
			} else throw new Error ("Please enter credentials");
		} 
		catch (error) {
  	  const alert = await this.alertController.create({
  	    header: 'Error',
  	    message: error.message,
  	    buttons: ['OK']
  	  });
  	  alert.present();
  	}
	}

	private async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }
}
