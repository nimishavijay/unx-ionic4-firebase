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
					}).then(() => {
						this.displayChatMessage();
    				this.scroll();
					})
				
				}	else {
    	    this.router.navigate(['/signin']);
				}
			})
		}
 
  ngOnInit() {
	}

  displayChatMessage() {
		console.log('display');
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
  }

  goBack() {
    this.offStatus = true;
    this.router.navigate(['/room']);
  }

/* 
  sendJoinMessage() {
		firebase.database().ref('chatrooms/' + this.roomkey + '/roomname').once('value')
			.then((roomdata) => {
				console.log(this.nickname + ' has joined ' + roomdata.val());
			})
			.catch((error) => {
				console.log(error.message);
				});
  //  this.sendMessage('join', this.nickname + ' has joined this room.');
  }

  sendExitMessage() {
    firebase.database().ref('chatrooms/' + this.roomkey + '/roomname').once('value')
			.then((roomdata) => {
				console.log(this.nickname + ' has exited ' + roomdata.val());
			})
			.catch((error) => {
				console.log(error.message);
			});
	//	this.sendMessage('exit', this.nickname + ' has exited this room.');
  } */
/*
  sendDeleteMessage(chat) {
	firebase.database().ref('chatrooms/' + this.roomkey + '/chats/' + chat.key).remove()
		.then(function() {
		    console.log("Remove succeeded.")
		})
		.catch(function(error) {
		    console.log("Remove failed: " + error.message)
		});
	}
*/

  private scroll() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 1000);
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
