import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit, OnDestroy {

  data = { 
		email: '', 
		password: '' 
	};

  constructor(
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
		this.data.email = '';
		this.data.password = '';
  }

	ngOnDestroy() {
		this.data.email = '';
		this.data.password = '';
	}

  async signIn() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.data.email, this.data.password);
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

  signUp() {
    this.router.navigate(['/signup']);
  }

}
