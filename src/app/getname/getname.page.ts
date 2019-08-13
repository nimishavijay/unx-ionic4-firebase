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
    	  firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', snapshot => {
					snapshot.forEach((data) => {
						this.currentUser.name = data.val().username;
						this.currentUser.key =  data.key;
						console.log('currentUser: ', this.currentUser);
					})
				})
			} else this.router.navigate(['/signin']);
		})
  }

	goBack() {
    this.router.navigate(['/menteehome']);
  }

	select(arg: string) {
		this.area = arg;
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
			// type: "admin",
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

		/* FILTER MENTORS BY AREA. CHANGE DATABASE  */

		await firebase.database().ref("areas/" + area).orderByChild("requests").limitToFirst(1).once("value", snapshot => {
			snapshot.forEach(data => {
				data.child("requests").ref.transaction(currentreq => {
					mentorId = data.key;
					return currentreq + 1
				})
			})
		})

/* await firebase.database().ref('mentors/').orderByChild("area").orderByValue().equalTo(area).limitToFirst(1).once("value", snapshot => {
			snapshot.forEach(data => {
				data.child("requests").ref.transaction((currentrequests) => { 
					mentorId = data.key;
					return currentrequests + 1 
				}).then(() => console.log("mentorId: ", mentorId))
			})
		}) */
		
		const newData = firebase.database().ref("chats/").push();
		await newData.set({
			mentorId: mentorId,
			menteeId: this.currentUser.key,
			menteeName: this.name,
			// type: "admin",
			dateCreated: Date()
		})
		firebase.database().ref("mentees/" + this.currentUser.key + "/chats/" + newData.key).set({
			mentorId: mentorId,
			menteeName: this.name,
			type: "mentor"
		}).then(() => console.log("pushed to mentees/key/chats/"))
		firebase.database().ref("mentors/" + mentorId + "/chats/" + newData.key).set({
			menteeId: this.currentUser.key,
			menteeName: this.name
		}).then(() => console.log("pushed to mentors/key/chats/"))
	}

	async continue() {
		if (this.area === "I'm not sure") {
			await this.adminChat();
		} 
		else await this.mentorChat(this.area);
	}

}
