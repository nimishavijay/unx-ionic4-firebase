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
				/* firebase.database().ref("/users" + firebase.auth().currentUser.uid).once("value", (snapshot) => {
					snapshot.forEach(data => {
						if (data.val().mentor === false) {
							if (data.val().mentee === false) {
								this.router.navigate(['/type'])
							} else this.router.navigate(["/getname"])			
						} else this.currentUser = data.key
					})
				}) */ this.currentUser = firebase.auth().currentUser.uid;
			} else this.router.navigate(["/signin"])
		})
  }

	async continue() {
		var areas = [];
		if (this.career === true) areas.push("career");
		if (this.social === true) areas.push("social");
		if (this.emotional === true) areas.push("emotional");
		if (this.self === true) areas.push("self");
		if (this.isOtherChecked === true) areas.push(this.other);
		await firebase.database().ref("mentors/" + this.currentUser).update({
			background: this.background,
			time: this.time,
			area: areas,
			courses: this.courses
		}).then(() => console.log("mentor contact updated"))

		for (let area of areas) {
			firebase.database().ref("areas/" + area).update({
				[this.currentUser]: {
					requests: 0
				}
			})
		}

		this.router.navigate(['/mentorassessment']);
	}
}

