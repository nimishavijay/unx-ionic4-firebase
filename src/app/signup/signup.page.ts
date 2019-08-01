import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, OnDestroy {

  data = { 
		email: '',
		password: '', 
		confirm: '', 
		username: ''
	};

  constructor(
		private location: Location,
    private router: Router,
    public alertController: AlertController,
		public toastController: ToastController
  ) { }

  ngOnInit() {
		this.data.email = '';
		this.data.password = ''; 
		this.data.confirm = ''; 
		this.data.username = '';
  }

	ngOnDestroy() {
		this.data.email = '';
		this.data.password = ''; 
		this.data.confirm = ''; 
		this.data.username = '';
	}

  async signUp() {
    try {
			if (this.data.password !== this.data.confirm) {
				throw new Error('Passwords do not match');
			}
      await firebase.auth().createUserWithEmailAndPassword(this.data.email, this.data.password);
			var activeUser = firebase.auth().currentUser;
			await activeUser.updateProfile({
				displayName: this.data.username,
				photoURL: null
			}).then(() => console.log("updated profile: \n", activeUser) )
				.catch((error) => console.log(error.message))

			const newData = firebase.database().ref("users/").push();
			await newData.set({
				type: (activeUser.email.indexOf("unx.life") !== -1) ? "admin": null, 
				email: activeUser.email,
				username: activeUser.displayName,
				uid: activeUser.uid,
			});
			
			this.presentToast("Successfully signed up");
    	newData.child("type").once("value", snapshot => {
				if (snapshot.val() == null) this.router.navigate(['/type'])
				// else this.router.navigate(['/adminhome']);
			})
    } catch (error) {
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
