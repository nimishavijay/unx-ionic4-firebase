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
	currentUser = {
		key: '',
		name: ''
	};

  constructor(private router: Router) { }

  async ngOnInit() {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', snapshot => {
					snapshot.forEach((data) => {
						this.currentUser.name = data.val().username;
						this.currentUser.key =  data.key;
						// console.log(this.currentUser);
					})
				});				
					firebase.database().ref('users/').on('value', resp => {
					this.users = [];
					resp.forEach(child => {
						if (child.key !== this.currentUser.key) {				
							var user = { key: '', name: '' }; 
							user.name = child.val().username;
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
			else snapshot.forEach(() => this.goToChat(snapshot.key));
		})
	}

	goToChat(chatKey) {
		console.log('navigate to /chat/' + chatKey);
		this.router.navigate(['chat/' + chatKey]);
	}



	newChat(userKey) {

	/***
	 Error: Reference.update failed: First argument contains undefined in property 
	'users.-LjvYcggsxEnvTOBNTTN.chats.-Lk5kDLDWxCNqDAuGoPh.user2Name' 
	Maybe delete users and try again? the db seems messed up
	***/
	
		var user2 = { key: '', name: '' };
		firebase.database().ref('users/' + userKey).on('value', snapshot => {
			console.log(snapshot.val());
			snapshot.forEach((data) => {
				user2.key = data.key;
				user2.name = data.val().username;
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
			user2Key: user2.key,
			user2Name: user2.name
		}).then(() => console.log("Chat pushed to user1db"));
		
		firebase.database().ref('users/' + userKey + '/chats/' + newDataChat.key).update({ 
			user2Key: this.currentUser.key,
			user2Name: this.currentUser.name
		}).then(() => console.log("Chat pushed to user2db"));	

		console.log('navigate to chat/' + newDataChat.key);
		this.router.navigate(['chat/' + newDataChat.key])

	}

	goBack() {
		this.router.navigate(['/room']);
	}

}
