import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NAMED_ENTITIES } from '@angular/compiler';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})

export class AddRoomPage implements OnInit {

  users = [];
	currentUser = {
		key: '',
		name: ''
	};
	user2 = {
		key: '',
		name: ''
	};

  constructor(private router: Router) { }

  async ngOnInit() {
		console.log('---NEW CHAT PAGE---');
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', snapshot => {
					snapshot.forEach((data) => {
						this.currentUser.name = data.val().username;
						this.currentUser.key =  data.key;
						console.log(this.currentUser);
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
			console.log('chat with user', snapshot.val(), 'user key', userKey);
			if (snapshot.val() === null) this.newChat(userKey) //console.log("newchat");
			else snapshot.forEach((data) => { console.log('gotochat ', data.key) ; this.goToChat(data.key) });
		})
	}

	goToChat(chatKey) {
		console.log('navigate to /chat/' + chatKey);
		this.router.navigate(['chat/' + chatKey]);
	}



	newChat(userKey) {

		firebase.database().ref('users/' + userKey).on('value', snapshot => {
			console.log(snapshot.val());
			this.user2.key = userKey;
			this.user2.name = snapshot.val().username;
			console.log("To create chat with: ", this.user2);
		});
		
		const newDataChat = firebase.database().ref('chats/').push();
		var chatDataPromise = newDataChat.set({
			mentor: userKey,
			mentee: this.currentUser.key,
			created: Date()
		}).then(() => console.log("Chat pushed to chatdb. Details: ", newDataChat))
			.catch((error) => console.log(error.message));

		chatDataPromise.then(() => { 
			firebase.database().ref('users/' + this. currentUser.key + '/chats/' + newDataChat.key).update({ 
				user2Key: this.user2.key,
				user2Name:this.user2.name
			}).then(() => console.log("Chat pushed to user1db"));
		}).catch((error) => console.log(error.message));

		chatDataPromise.then(() => {
			firebase.database().ref('users/' + userKey + '/chats/' + newDataChat.key).update({ 
				user2Key: this.currentUser.key,
				user2Name: this.currentUser.name
			}).then(() => console.log("Chat pushed to user2db"));	
		}).catch((error) => console.log(error.message));

		console.log('navigate to chat/' + newDataChat.key);
		this.router.navigate(['chat/' + newDataChat.key])
			
	}

	goBack() {
		this.router.navigate(['/room']);
	}

}
