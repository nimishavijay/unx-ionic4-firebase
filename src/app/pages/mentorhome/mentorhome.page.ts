import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentorhome',
  templateUrl: './mentorhome.page.html',
  styleUrls: ['./mentorhome.page.scss'],
})
export class MentorhomePage implements OnInit {

  chats = [];
	currentUser: any = {
		key: null,
		name: null
	};

  constructor(
		private router: Router
	) { }

	async ngOnInit() {
		console.log('---EXISTING CHATS---');
	  firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				this.currentUser.key = firebase.auth().currentUser.uid;
				console.log("key: ", this.currentUser.key );
				firebase.database().ref('mentors/' + this.currentUser.key + "/name").once('value', snapshot => {
				this.currentUser.name =  snapshot.val();
			});
			firebase.database().ref('mentors/' + this.currentUser.key + "/chats").on('value', snapshot => {
				this.chats = [];
				snapshot.forEach(chat => {
					console.log(chat.val());
					const temp = chat.val();
					temp.key = chat.key;
					this.chats.push(temp);
				}) 
			});
			
	    } else {
	      this.router.navigate(['/signin']);
	    }
	  });
	}

  goToChat(chatKey: string) {
		this.router.navigate(['/adminchat/' + chatKey]);
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
