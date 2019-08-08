import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-mentorinfo',
  templateUrl: './mentorinfo.page.html',
  styleUrls: ['./mentorinfo.page.scss'],
})
export class MentorinfoPage implements OnInit {

	currentUser: string;

	background: string;
	time: number;
	courses: string;

	// area = [];
	career: boolean;
	social: boolean;
	emotional: boolean;
	self: boolean;
	isOtherChecked: boolean;
	other: string;


  constructor(
		private router: Router
	) { }

  ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref("/users").orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("value", (snapshot) => {
					snapshot.forEach(data => {
						if (data.val().mentor === false) {
							if (data.val().mentee === false) {
								this.router.navigate(['/type'])
							} else this.router.navigate(["/getname"])			
						} else this.currentUser = data.key
					})
				})
			} else this.router.navigate(["/signin"])
		})
  }

	async continue() {
		var area = [];
		if (this.career === true) area.push("career");
		if (this.social === true) area.push("social");
		if (this.emotional === true) area.push("emotional");
		if (this.self === true) area.push("self");
		if (this.isOtherChecked === true) area.push(this.other);
		await firebase.database().ref("mentors/" + this.currentUser).update({
			background: this.background,
			time: this.time,
			area: area,
			courses: this.courses
		}).then(() => console.log("mentor contact updated"))

		this.router.navigate(['/mentorassessment']);
	}
}

