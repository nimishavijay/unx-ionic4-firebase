import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NAMED_ENTITIES } from '@angular/compiler';
import { RoomPage } from '../room/room.page' ;

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})

export class AddRoomPage implements OnInit {

  users;
	currentUser;

  constructor(private router: Router) { }

  async ngOnInit() {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', snapshot => {
					snapshot.forEach((data) => {
						this.currentUser = data.val();
						this.currentUser.key =  data.key;
						// console.log(this.currentUser);
					})
				});				
					firebase.database().ref('users/').on('value', resp => {
					this.users = [];
					resp.forEach(child => {
						if (child.key !== this.currentUser.key) {				
							const user = child.val(); 
/* ---
	HUGE PROBLEM HERE. If the entire contents of child.val() are copied to user,
	then the active user might have access to the other user's chats.
	Change security rules.
*/ 
							user.username = child.val().username;
							user.key = child.key;
							this.users.push(user);			
						}			
					})
				})
			} else {
				this.router.navigate(['/signin']);
			}
		});
  }

	async chatWithUser(userKey) {	
		firebase.database().ref('users/' + this.currentUser.key + '/chats/').orderByChild('user2Key').equalTo(userKey).on('value', snapshot => {
			// console.log(snapshot.val());
			if (snapshot.val() === null) this.newChat(userKey);
			else snapshot.forEach(() => this.goToChat(userKey));
		})
	}

	goToChat(userKey) {
		console.log('navigate to /chats/' + userKey);
	}

	newChat(userKey) {
		var user2Data;
		firebase.database().ref('users/').orderByKey().equalTo(userKey).on('value', snapshot => {
			snapshot.forEach((data) => {
				user2Data = data.val();
				// console.log(data.val());
			})
		});
		
		const newDataChat = firebase.database().ref('chats/').push();
		newDataChat.set({
			mentor: userKey,
			mentee: this.currentUser.key,
			created: Date()
		}).then(() => console.log("Chat pushed to chatdb"))
			.catch((error) => console.log(error.message));
		
		firebase.database().ref('users/' + this. currentUser.key + '/chats/' + newDataChat.key).update({ 
			user2Key: userKey,
			user2Name: user2Data.username
		}).then(() => console.log("Chat pushed to user1db"));
		
		firebase.database().ref('users/' + userKey + '/chats/' + newDataChat.key).update({ 
			user2Key: this.currentUser.key,
			user2Name: this.currentUser.username
		}).then(() => console.log("Chat pushed to user2db"));	
	}

	goBack() {
		this.router.navigate(['/room']);
	}

}
