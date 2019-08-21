import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Key } from 'protractor';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {

  chats = [];
	currentUser: any;

	isloading = true;

  constructor(
		private router: Router
	) { }

	async ngOnInit() {
		console.log('---EXISTING CHATS---');
	  firebase.auth().onAuthStateChanged(async (user) => {
	    if (user) {
				await firebase.database().ref("users/" + firebase.auth().currentUser.uid).once("value", snapshot => {
					if (snapshot.val()) this.signOut();
				})
				this.currentUser = firebase.auth().currentUser.uid;
				firebase.database().ref('admins/' + this.currentUser + "/chats").on('value', snapshot => {
					console.log(snapshot.val());
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
