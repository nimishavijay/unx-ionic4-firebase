import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  data: { 
		email: string, 
		password: string, 
		confirm: string, 
		username: string, 
	} = { 
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
			}).then(() => console.log("updated profile: \n" + activeUser) )
				.catch((error) => console.log(error.message))
		/* 
			var newUser = firebase.database().ref('users/').push();
			console.log(activeUser);
			newUser.set({
				'info': activeUser
			})
				.then(() => console.log('set info: ' + activeUser))
				.catch((error) => console.log(error.message));
			 */
			
			const newData = firebase.database().ref("users/").push();
			newData.set({
				// info: {
					email: activeUser.email,
					username: activeUser.displayName,
					uid: activeUser.uid,
				// },
				chats: { } 
			});
			
			console.log(this.data.username + ' signed up');
    	this.router.navigate(['/room']);
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
