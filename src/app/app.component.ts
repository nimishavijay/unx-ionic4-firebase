import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
	styleUrls: ['app.scss']
})
export class AppComponent {

	lastTimeBackPress = 0;
	timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
		private location: Location,
		private router: Router,
		private toastController: ToastController
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebase);
  }

	
	backButtonEvent() {
		this.platform.backButton.subscribe(async () => {
			if (this.router.url === "/menteehome" || this.router.url === "/mentorhome" || this.router.url === "/adminhome" || this.router.url === "/signin") {
				if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
        //  this.platform.exitApp(); // Exit from app
        	navigator['app'].exitApp(); // work for i
     			} else {
        		this.presentToast("Press again to exit")
        		this.lastTimeBackPress = new Date().getTime();
     			}
			}	else {
				this.location.back();
			}
		})
	}

	private async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
