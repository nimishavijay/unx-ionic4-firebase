import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { promise } from 'protractor';

@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.page.html',
  styleUrls: ['./adminchat.page.scss'],
})
export class AdminchatPage implements OnInit {

	chatId: string;
  
	currentUser = {
		key: '',
		name: ''
	};

	admin = {
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
			this.chatId = this.router.url.split('/').slice(-1)[0]; 
		} 
	/* 
			firebase.auth().onAuthStateChanged((user) => {
    	  if (user) {
					console.log('--- CHAT PAGE ---');
					this.chatId = this.router.url.split('/').slice(-1)[0]; 
					console.log('chatId: ' + this.chatId);
					firebase.database().ref('adminchats/' + this.chatId).once('value', snapshot => {
						this.admin.key = snapshot.child('adminId').val();
						this.currentUser.name = snapshot.child('menteeName').val();
						this.currentUser.key = snapshot.child('menteeId').val();
					}).then(() => {
							this.ngOnInit()
						})
				
				}	else {
    	    this.router.navigate(['/signin']);
				}
			}) 
		}
 
 	async ngOnInit() {
		await this.displayChatMessage();
		this.scroll();
	}

	*/

	async ngOnInit() {
		await firebase.auth().onAuthStateChanged((user) => {
    	  if (user) {
					console.log('--- CHAT PAGE ---');
					firebase.database().ref('adminchats/' + this.chatId).once('value', snapshot => {
						this.admin.key = snapshot.child('adminId').val();
						this.currentUser.name = snapshot.child('menteeName').val();
						this.currentUser.key = snapshot.child('menteeId').val();
					})
				
				}	else {
    	    this.router.navigate(['/signin']);
				}
			})
	}

	ionViewWillEnter() {
		console.log("will enter");
		this.displayChatMessage();
	}

	ionViewDidEnter() {
		console.log("did enter");
		this.scroll();
	}

  async displayChatMessage() {
		// console.log('display');
    await firebase.database().ref('adminchats/' + this.chatId + '/messages').once('value', snapshot => {
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
		this.scroll();
  }

  goBack() {
    this.router.navigate(['/menteehome']);
  }

  private scroll() {
    setTimeout(() => {  
			this.content.scrollToBottom(1);
		}, 100);
  }


	async sendMessage(content: string) {
		if (this.chatMessage.trim() !== "") {
	  	const newData = firebase.database().ref('adminchats/' + this.chatId + '/messages/').push();
	  	newData.set({
	  	  senderId: this.currentUser.key,
	  	  receiverId: this.admin.key,
				content: content,
	  	  date: Date()
			})
			this.messages.push({
				senderId: this.currentUser.key,
	  	  receiverId: this.admin.key,
				content: content,
	  	  date: Date()
			})
		this.chatMessage = "";
  	this.scroll();
		// this.content.scrollToBottom();
		}
	}	
}
