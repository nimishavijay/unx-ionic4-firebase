import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-type',
  templateUrl: './type.page.html',
  styleUrls: ['./type.page.scss'],
})
export class TypePage implements OnInit {

	button1: any = {
		fill: "outline"
	};

	button2: any = {
		fill: "outline"
	};

	cont: any = {
		disabled: "true"
	};

	currentUser = {
		key: "",
		name: ""
	};

	type: string;

  constructor(
		private router: Router
	) { }

  ngOnInit() {
  }

	setToMentor() {
		this.type = "mentor"
		this.button1.fill = "solid";
		this.button2.fill = "outline";
		this.cont.disabled = "false";
	}
	setToMentee() {
		this.type = "mentee";
		this.button2.fill = "solid";
		this.button1.fill = "outline";
		this.cont.disabled = "false";
	}

	async continue() {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				var thisUser;
				await firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', snapshot => {
					console.log(snapshot);
					snapshot.forEach(data => {
						firebase.database().ref("users/" + data.key + "/currentState").set(this.type);
						thisUser = data.key;
					})
					this.router.navigate(['/menteehome']);
				});	
			} else this.router.navigate(['/signin']);
		})	
	}
}
