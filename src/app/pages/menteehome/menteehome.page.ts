import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Key } from 'protractor';


@Component({
  selector: 'app-menteehome',
  templateUrl: './menteehome.page.html',
  styleUrls: ['./menteehome.page.scss'],
})
export class MenteehomePage implements OnInit {

  chats = [];
	currentUser: any = {
		key: '',
		email: ''
	};

  constructor(
		private router: Router
	) { 
		console.log("url: ", this.router.url)
	}

	async ngOnInit() {
		console.log('---EXISTING CHATS---');
	  firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				this.currentUser.key = firebase.auth().currentUser.uid;
				this.currentUser.email = firebase.auth().currentUser.email;
				firebase.database().ref('mentees/' + this.currentUser.key + '/chats/').on('value', snapshot => {
					console.log(snapshot);
					// if (snapshot) {
						this.chats = [];
						snapshot.forEach(chat => {
							// console.log(chat.val());
							const temp = chat.val();
							temp.key = chat.key;
							this.chats.push(temp);
						}) 
					// }
				});
	    } else {
	      this.router.navigate(['/signin']);
	    }
	  });
	}

  goToChat(chatKey: string) {
		console.log("gotochat");
		this.router.navigate(['/adminchat/' + chatKey]);
	}

  async newChat() {
    // this.router.navigate(['/add-room']);
/* 		firebase.database().ref('admins/').orderByChild("requests").limitToFirst(1).once("value", snapshot => {
				snapshot.forEach(data => {
					// var currentrequests = data.val().requests;
					data.child("requests").ref.transaction((currentrequests) => { 
						return currentrequests + 1 
					}).then(() => console.log(data.val()))
				})
		}) */
		this.router.navigate(['/getname']);

  }

	settings() {
		console.log("navigate to settings");
		this.router.navigate(['/settings']);
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
