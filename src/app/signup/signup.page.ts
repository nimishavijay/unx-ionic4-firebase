import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    private router: Router,
    public alertController: AlertController
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
				email: activeUser.email,
				username: activeUser.displayName,
				uid: activeUser.uid,
			});
			
			console.log(this.data.username + ' signed up');
    	this.router.navigate(['/type']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
