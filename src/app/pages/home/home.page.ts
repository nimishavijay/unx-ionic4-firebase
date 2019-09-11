import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	isLoading: boolean = true;
	currentUser: any = {
		key: '',
		state: ''
	};

	constructor (
		private router: Router
	) { }

	async ngOnInit() {
		firebase.auth().onAuthStateChanged(async user => {
			if (user) {
				if (firebase.auth().currentUser.email.indexOf("unx.life") !== -1) {
					this.router.navigate(['/adminhome'])
				}
				else {
					await firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/currentState").once("value", snapshot => {
							this.currentUser.state = snapshot.val();
					}).then(() => console.log("type: ", this.currentUser.state));
					if (this.currentUser.state === "mentor") this.router.navigate(['/mentorhome'])
					else if (this.currentUser.state === "mentee") this.router.navigate(['/menteehome'])
					else console.log("error");
				}
			} else this.router.navigate(["/signin"]); 
		})
	}

}
