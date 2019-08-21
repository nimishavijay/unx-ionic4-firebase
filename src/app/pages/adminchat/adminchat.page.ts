import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalPage } from "../modal/modal.page";
import * as firebase from 'firebase';
import { promise } from 'protractor';

@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.page.html',
  styleUrls: ['./adminchat.page.scss'],
})
export class AdminchatPage implements OnInit {

	chatId: string;

	currentUser: string;
	currentUserState: string;

	chatType: string;
  
	mentee = {
		key: '',
		name: ''
	};

	admin = {
		key:'',
		name: ''
	};

	mentor: any = {
		key:'',
		name: ''
	};

	user1: any;
	user2: any;

	viewMentor: boolean = false;
	
  chatMessage: string;
  messages = [];
  offStatus = false;

	isloading = true;

	loaderToShow: any;

  @ViewChild(Content) content: Content;
	@ViewChild("inputElement") inputElement: any;

  constructor (
    private router: Router,
    public route: ActivatedRoute,
		private loadingController: LoadingController,
		public modalController: ModalController,
		private location: Location
  ) { 
			this.chatId = this.router.url.split('/').slice(-1)[0]; 
		} 

	async ngOnInit() {
		await firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				console.log('--- CHAT PAGE ---');
				this.currentUser = firebase.auth().currentUser.uid;
				await firebase.database().ref("users/" + this.currentUser + "/currentState").once("value", snapshot =>	{
					this.currentUserState = (firebase.auth().currentUser.email.indexOf("unx.life") === -1) ? snapshot.val() : "admin";
				}).then(() => console.log(this.currentUserState));
				firebase.database().ref('chats/' + this.chatId).once('value', snapshot => {
					this.chatType = snapshot.child("type").val();
					this.mentee.name = snapshot.child('menteeName').val();
					this.mentee.key = snapshot.child('menteeId').val();
					console.log("mentee: ", this.mentee);
					
					if (this.chatType === "admin") {
						this.admin.key = snapshot.child('adminId').val();
						this.admin.name = "Admin";
						console.log("admin: ", this.admin);
						if (this.currentUserState === "admin") {
							this.user1 = this.admin;
							this.user2 = this.mentee;
						} else {
							this.user1 = this.mentee;
							this.user2 = this.admin;
						}
					}
					else {
						this.mentor.key = snapshot.child("mentorId").val();
						this.mentor.name = snapshot.child("mentorName").val();
						console.log("mentor: ", this.mentor);
						if (this.currentUserState === "mentee") {
							this.user1 = this.mentee;
							this.user2 = this.mentor;
						} else {
							this.user1 = this.mentor;
							this.user2 = this.mentee;
						}
					}
				}).then(() => {
					this.ionViewWillEnter();
					this.isloading = false;
					console.log("user1: ", this.user1, "user2: ", this.user2);
				});
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
    await firebase.database().ref('chats/' + this.chatId + "/" + this.chatType + 'messages').once('value', snapshot => {
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
    this.location.back();
  }

  private scroll() {
    setTimeout(() => {  
			this.content.scrollToBottom(1);
		}, 100);
  }


	async sendMessage(content: string) {
		if (this.chatMessage.trim() !== "") {
	  	const newData = firebase.database().ref('chats/' + this.chatId + "/" + this.chatType + 'messages').push();
	  	newData.set({
	  	  senderId: this.user1.key,
	  	  receiverId: this.user2.key,
				content: content,
	  	  date: Date()
			})
			this.messages.push({
				senderId: this.user1.key,
	  	  receiverId: this.user2.key,
				content: content,
	  	  date: Date()
			})
		this.chatMessage = "";
  	this.scroll();
		}
	}	

	findAMentor() {
		/*  
			ADMIN -> CREATE MODAL WITH DIFFERENT AREAS. ADMIN WILL SELECT AN AREA.
							QUERY THE MENTOR UNDER THAT AREA WITH THE LEAST NUMBER OF REQUESTS.
							CHANGE CHATS/CHAT_ID/TYPE TO MENTOR
			
			=> MENTEE -> A MODAL WILL APPEAR ON MENTEE'S SCREEN SAYING YOU HAVE BEEN CONNECTED TO SO AND SO DO YOU WANNA CONTINUE?
			YES -> PUSH MENTOR DETAILS TO CHATS/CHAT_ID AND MENTEES/MENTEE_ID AND MENTORS/MENTOR_ID
				MENTEES -> DISMISS MODAL, REFRESH PAGE AND SHOW MENTOR CHATS
				ADMIN -> DISMISS MODAL, CONNECTED MENTEE_NAME TO MENTOR_NAME 
			NO -> CHANGE CHATS/CHAT_ID/TYPE TO ADMIN 
				MENTEES ->  DISMISS MODAL, CONTINUE CHAT
				ADMIN -> DISMIS MODAL, CONTINUE CHAT
		*/

		this.openModal()


	}

	public async openModal() {
		const modal = await this.modalController.create({
	    component: ModalPage,
	    componentProps: {}
		});
		return await modal.present();	
	}

	viewMentorDetails() {
		if (this.currentUserState === "mentee") {
			this.viewMentor = true;
		}
	}


	showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'This Loader will Not AutoHide'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.hideLoader();
  }
 
  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 4000);
  }


}
