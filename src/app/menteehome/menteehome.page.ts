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
		name: ''
	};

  constructor(
		private router: Router
	) { }

	async ngOnInit() {
		console.log('---EXISTING CHATS---');
	  firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
			await firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', snapshot => {
				snapshot.forEach((data) => {
					this.currentUser.name = data.val().username;
					this.currentUser.key =  data.key;
					console.log(this.currentUser.key);
				})
			})
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

  goToChat(chatKey: string) {
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
