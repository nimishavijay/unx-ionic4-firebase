import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

	chatId: string;
	area: string;
	areas: any = [
		{
			name: "Career",
			icon: "briefcase"
		},
		{
			name: "Social",
			icon: "contacts"
		},
		{
			name: "Emotional",
			icon: "happy"
		},
		{
			name: "Self Development",
			icon: "flower"
		},
		{
			name: "Relationships",
			icon: "heart"
		}
	]

  constructor(
		public modalController: ModalController,
		private router: Router
	) {
			this.chatId = this.router.url.split('/').slice(-1)[0]; 
	 }

  ngOnInit() {
  }

	select(arg: string) {
		this.area = arg.toLowerCase();
	}

	async submit() {
		var mentorId: string;
		var mentorName: string;

		await firebase.database().ref("areas/" + this.area).orderByChild("requests").limitToFirst(1).once("value", snapshot => {
			snapshot.forEach(data => {
				console.log(data)
				data.child("requests").ref.transaction((currentreq) => {
					mentorId = data.key;
					return currentreq + 1
				}).then(() => console.log("mentorId: ", mentorId))
			})
		})

		await firebase.database().ref("mentors/" + mentorId + "/name").once("value", snapshot => {
			mentorName = snapshot.val();
		}).then(() => console.log("Mentor: ", mentorName));

		await firebase.database().ref("chats/" + this.chatId).update({
			mentorId: mentorId,
			mentorName: mentorName,
			type: "mentor",
			dateAdded: Date()
		}).then(() => console.log("added mentor"));

		this.closeModal();
	}

	closeModal() {
		this.modalController.dismiss();
	}

}
