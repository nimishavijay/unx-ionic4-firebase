import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getname',
  templateUrl: './getname.page.html',
  styleUrls: ['./getname.page.scss'],
})
export class GetnamePage implements OnInit {

	currentUser: any = {
		key: '',
		name: ''
	};

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
		},
		{
			name: "I'm not sure",
			icon: "help"
		},
	]

	area: string = null;

	name: string = null;

  constructor(
		private router: Router
	) { }

  ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
    	if (user) {
				console.log('---GET NAME---');
    	  this.currentUser.key = firebase.auth().currentUser.uid;
			} else this.router.navigate(['/signin']);
		})
  }

	goBack() {
    this.router.navigate(['/menteehome']);
  }

	select(arg: string) {
		if (arg === "I'm not sure") this.area = "other";
		else this.area = arg.split(" ")[0].toLowerCase();
	}

	async adminChat() {
		var adminId: string;
		await firebase.database().ref('admins/').orderByChild("requests").limitToFirst(1).once("value", snapshot => {
			snapshot.forEach(data => {
				data.child("requests").ref.transaction((currentrequests) => { 
					adminId = data.key;
					return currentrequests + 1 
				}).then(() => console.log("adminId: ", adminId))
			})
		})
		console.log("mentee: ", this.currentUser.key, "nickname: ", this.name);

		const newData = firebase.database().ref("chats/").push();
		await newData.set({
			adminId: adminId,
			menteeId: this.currentUser.key,
			menteeName: this.name,
			type: "admin",
			dateCreated: Date()
		}).then(() => {
			const helloMessage = newData.child("adminmessages").push();
			helloMessage.set({
				senderId: adminId,
	  	  receiverId: this.currentUser.key,
				content: "Hi, " + this.name + "! Welcome to UNX. I'm here to help you through your problems. What's been bothering you?",
	  	  date: Date()
			})
			console.log("pushed to chats/")
		})
		firebase.database().ref("mentees/" + this.currentUser.key + "/chats/" + newData.key).set({
			adminId: adminId,
			menteeName: this.name,
			type: "admin"
		}).then(() => console.log("pushed to mentees/key/chats/"))
		firebase.database().ref("admins/" + adminId + "/chats/" + newData.key).set({
			menteeId: this.currentUser.key,
			menteeName: this.name
		}).then(() => console.log("pushed to admin/key/chats/"))
		
		this.router.navigate(['/adminchat/'+ newData.key]);
	}

	async mentorChat(area: string) {
		var mentorId: string;
		var mentorName: string;

		console.log(area);

		await firebase.database().ref("areas/" + area).orderByChild("requests").limitToFirst(1).once("value", snapshot => {
			snapshot.forEach(data => {
				console.log(data)
				data.child("requests").ref.transaction((currentreq) => {
					mentorId = data.key;
					return currentreq + 1
				}).then(() => console.log("mentorId: ", mentorId))
			})
		})
		firebase.database().ref("mentors/" + mentorId + "/requests").transaction(currentRequests => {
			return currentRequests + 1;
		})

		await firebase.database().ref("mentors/" + mentorId + "/name").once("value", snapshot => {
			mentorName = snapshot.val();
		}).then(() => console.log("Mentor: ", mentorName));
		 
		const newData = firebase.database().ref("chats/").push({
			mentorId: mentorId,
			mentorName: mentorName,
			menteeId: this.currentUser.key,
			menteeName: this.name,
			type: "mentor",
			dateCreated: Date()
		})
		firebase.database().ref("mentees/" + this.currentUser.key + "/chats/" + newData.key).set({
			mentorId: mentorId,
			mentorName: mentorName,
			menteeName: this.name,
			type: "mentor"
		}).then(() => console.log("pushed to mentees/key/chats/"))
		firebase.database().ref("mentors/" + mentorId + "/chats/" + newData.key).set({
			menteeId: this.currentUser.key,
			menteeName: this.name
		}).then(() => console.log("pushed to mentors/key/chats/"))

		this.router.navigate(["/adminchat/" + newData.key]) 
	}

	async continue() {
		if (this.area === "other") {
			await this.adminChat();
		} 
		else await this.mentorChat(this.area);
	}

}
