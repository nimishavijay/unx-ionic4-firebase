import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { logging } from 'protractor';

@Component({
  selector: 'app-informmentee',
  templateUrl: './informmentee.page.html',
  styleUrls: ['./informmentee.page.scss'],
})
export class InformmenteePage implements OnInit {

  chatId: string;
	currentUser: string;
	menteeName: string;
	mentor: {};
	mentorId: string;
	mentorName: string;
	mentorBg: string;
	mentorRating: string;


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
					this.mentorBg = snapshot.child("background").val();
					this.mentorRating = snapshot.child("rating").val();
				})
			} else this.router.navigate(['/signin']);
		})
  }

	mentorChat() {

		firebase.database().ref("chats/" + this.chatId).update({
			type: "mentor",
			dateAdded: Date(),

		})

		firebase.database().ref("mentees/" + this.currentUser + "/chats/" + this.chatId).update({
			mentorId: this.mentorId,
			mentorName: this.mentorName,
			type: "mentor",
		})

		firebase.database().ref("mentors/" + this.mentorId + "/chats/" + this.chatId).update({
			menteeId: this.currentUser,
			menteeName: this.menteeName,
		})

		this.closeModal();
		this.reloadComponent();

	}

	reloadComponent() {
		window.location.reload();
	}

	adminChat() {
		var thisChatRef = firebase.database().ref("chats/" + this.chatId)
		thisChatRef.child("mentorId").remove();
		thisChatRef.child("mentorName").remove();	
		thisChatRef.child("type").set("admin");	
		this.closeModal();
	}

	closeModal() {
		this.modalController.dismiss();
	}

}
