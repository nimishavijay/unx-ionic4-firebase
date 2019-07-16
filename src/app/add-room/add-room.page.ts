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
/* 
	HUGE PROBLEM HERE. If the entire contents of child.val() are copied to user,
	then the active user might have access to the other user's chats.
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

	chatWithUser(key) {
		if ( key in firebase.database().ref('users/' + this.currentUser.key + 'chats/')) {
			// this.router.navigate(['/chats' + key])
			console.log("navigate to /chats/" + key);
// DOESN'T WORK
		}
		else {
			var temp;
			firebase.database().ref('users/').orderByKey().equalTo(key).on('value', snapshot => {
					snapshot.forEach((data) => {
						temp = data.val();
						console.log(data.val());
					})
				});	
			const newDataChat = firebase.database().ref('chats/').push();
			newDataChat.set({
				mentor: key,
				mentee: this.currentUser.key,
				created: Date()
			})
				.then(() => console.log("Chat pushed to chatdb"))
				.catch((error) => console.log(error.message));

			const newDataUser = firebase.database().ref('users/' + this. currentUser.key + '/chats/').set({ [newDataChat.key]: temp.username })
				.then(() => console.log("Chat pushed to userdb"));
		}
	}

	goBack() {
		this.router.navigate(['/room']);
	}

}
