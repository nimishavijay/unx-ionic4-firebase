import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentorcontact',
  templateUrl: './mentorcontact.page.html',
  styleUrls: ['./mentorcontact.page.scss'],
})
export class MentorcontactPage implements OnInit {

	currentUser: string;

	name: string;
	phone: string;
	socialmedia: string;

  constructor(
		private router: Router
	) { }

  ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				/* firebase.database().ref("users/" + firebase.auth().currentUser.uid).once("value", (snapshot) => {
					snapshot.forEach(data => {
						if (data.val().mentor === false) {
							if (data.val().mentee === false) {
								this.router.navigate(['/type'])
							} else this.router.navigate(["/getname"])			
						} else this.currentUser = firebase.auth().currentUser.uid;
					})
				}) */ this.currentUser = firebase.auth().currentUser.uid; 
			} else this.router.navigate(["/signin"])
		})
  }

	async continue() {
		await firebase.database().ref("mentors/" + this.currentUser).set({
			name: this.name,
			phone: this.phone,
			socialmedia: this.socialmedia,
			requests: 0
		}).then(() => console.log("mentor contact updated"))

		this.router.navigate(['/mentorinfo']);
	}

}
