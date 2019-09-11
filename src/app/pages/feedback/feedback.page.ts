import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

	comment: string;
	chatId: string;
	currentUser: string;
	menteeName: string;
	mentorId: string;
	mentorName: string;
	// mentorBg: string;
	mentorRating: string;
	rate: any;

  constructor(
		public modalController: ModalController,
		private router: Router,
		private location: Location
	) {
			this.chatId = this.router.url.split('/').slice(-1)[0]; 
	}
  ngOnInit() {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				this.currentUser = firebase.auth().currentUser.uid;
				firebase.database().ref("users/" + this.currentUser + "/currentState").once("value", (snapshot) => {
					if (snapshot.val() !== "mentee") this.router.navigate(['/signin']);
				})
				await firebase.database().ref("chats/" + this.chatId).once("value", snapshot => {
					this.menteeName = snapshot.child("menteeName").val();
					this.mentorId = snapshot.child("mentorId").val();
					this.mentorName = snapshot.child("mentorName").val();
				})
				firebase.database().ref("mentors/" + this.mentorId).once("value", snapshot => {
					this.mentorRating = snapshot.child("rating").val();
				})
			} else this.router.navigate(['/signin']);
		})
  }

	onModelChange() {
		console.log(this.rate);
	}

	submit() {
		var completed: number;
		firebase.database().ref("chats/" + this.chatId).update({
			feedback: {
				rating: this.rate,
				comment: this.comment
			},
			closed: true
		})

		firebase.database().ref("mentors/" + this.mentorId + "/closedSessions").transaction(currentCompleted => {
			completed = currentCompleted;
			completed++;
			return (currentCompleted || 0) + 1
		})

		firebase.database().ref("mentors/" + this.mentorId + "/rating").transaction(currentRating => {
			return ((currentRating+this.rate)/completed).toFixed(2)
		}).then(() => { console.log("rating updated") })

		this.router.navigate(['/menteehome']);
	}

	closeModal() {
		this.modalController.dismiss();
	}


}
