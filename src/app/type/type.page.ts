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

	currentUser: any = {
		key: "",
		name: ""
	};

	type: string;

  constructor(
		private router: Router
	) { }

  ngOnInit() {
		firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				console.log(firebase.auth().currentUser.uid);
				firebase.database().ref("users/").orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("value", snapshot => {
					snapshot.forEach(data => {
						this.currentUser.key = data.key;
					})
				})
  		} else {
				this.router.navigate(['/signin']);
			}
		})
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
		await firebase.database().ref("users/" + this.currentUser.key + "/" + this.type).set(true);
		await firebase.database().ref("users/" + this.currentUser.key + "/currentState").set(this.type);
		if (this.type === "mentor") {
			this.router.navigate(["/mentorinfotabs"]);
		} else if (this.type === "mentee") {
			this.router.navigate(["/getname"]);
		}
	}
}
