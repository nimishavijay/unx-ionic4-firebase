import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  chats = [];

  constructor(private router: Router) { }

	async ngOnInit() {
	  firebase.auth().onAuthStateChanged((user) => {
	    if (user) {
				var activeUser = firebase.auth().currentUser;
			//	console.log(activeUser);
	    /*  firebase.database().ref('user/').on('value', resp => {
	        if (resp) {
	          this.chats = [];
	          resp.forEach(childSnapshot => {
	            const chat = childSnapshot.val();
	            chat.key = childSnapshot.key;
	            this.chats.push(chat);
	          })
					} else {
						console.log("error");
					}
	      }); */
	    } else {
	      this.router.navigate(['/signin']);
	    }
	  });
	}

  
  goToChat(key) {
		console.log('chat with ' + key);
//		this.router.navigate(['/chat/' + key]);
	}

  newChat() {
    this.router.navigate(['/add-room']);
  }

	settings() {
		console.log("navigate to settings");
	}

  async signOut() {
    try {
      await firebase.auth().signOut();
      this.router.navigate(['/signin']);
    } catch (error) {
			console.log('Sign out error: ' + error.message);
		}
  }
}
