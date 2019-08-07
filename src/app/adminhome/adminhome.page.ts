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
			await firebase.database().ref('admins/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', snapshot => {
				snapshot.forEach((data) => {
					this.currentUser.name = data.val().username;
					this.currentUser.key =  data.key;
					console.log(this.currentUser.key);
				})
			})
			firebase.database().ref('admins/' + this.currentUser.key + "/chats").on('value', snapshot => {
					console.log(snapshot.val());
				// if (snapshot) {
					this.chats = [];
					snapshot.forEach(chat => {
						console.log(chat.val());
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
