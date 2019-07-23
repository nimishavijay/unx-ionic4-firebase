import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { promise } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

	chatId: string;
  
	currentUser = {
		key: '',
		name: ''
	};

	user2 = {
		key:'',
		name: ''
	};
	
  chatMessage: string;
  messages = [];
  offStatus = false;

  @ViewChild(Content) content: Content;

  constructor (
    public router: Router,
    public route: ActivatedRoute
  ) { 
			firebase.auth().onAuthStateChanged((user) => {
    	  if (user) {
					console.log('--- CHAT PAGE ---');
    	    firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', snapshot => {
						snapshot.forEach((data) => {
							this.currentUser.name = data.val().username;
							this.currentUser.key =  data.key;
							console.log('currentUser: ', this.currentUser);
						})
					}).then(() => {
						this.chatId = this.router.url.split('/').slice(-1)[0]; 
						console.log('chatId: ' + this.chatId);
						firebase.database().ref('users/' + this.currentUser.key + '/chats/' + this.chatId).once('value', snapshot => {
							this.user2.key = snapshot.child('user2Key').val();
							this.user2.name = snapshot.child('user2Name').val();
							console.log('user2: ', this.user2);
						})
					})
					.then(() => {
						this.ngOnInit()
					})
				
				}	else {
    	    this.router.navigate(['/signin']);
				}
			})
		}
 
  ngOnInit() {
		this.displayChatMessage();
		this.scroll();
	}

  displayChatMessage() {
		// console.log('display');
    firebase.database().ref('chats/' + this.chatId + '/messages').on('value', snapshot => {
      if (snapshot) {
				// console.log(snapshot.val())
        this.messages = [];
        snapshot.forEach(data => {
          const msg = data.val();
          msg.key = data.key;
					// console.log("msg: ", msg);
          this.messages.push(msg);
        });
      }
    });
		// this.scroll();
  }

  goBack() {
    this.offStatus = true;
    this.router.navigate(['/room']);
  }

  private scroll() {
    setTimeout(() => {  
			this.content.scrollToBottom(100);
		}, 100);
  }


	sendMessage(content: string) {
		if (this.chatMessage !== "") {
	  	const newData = firebase.database().ref('chats/' + this.chatId + '/messages/').push();
	  	newData.set({
	  	  senderId: this.currentUser.key,
	  	  receiverId: this.user2.key,
				content: content,
	  	  date: Date()
			});
		this.chatMessage = ""
  	this.scroll();
		}
	}	
}
