import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalPage } from "../modal/modal.page";
import { InformmenteePage } from "../informmentee/informmentee.page";
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
	mentorAdded: boolean = false;
  
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
				console.log(window.history);
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
					this.checkMentorAdded();
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
    await firebase.database().ref('chats/' + this.chatId + "/" + this.chatType + 'messages').on('child_added', snapshot => {
      if (snapshot) {
        const msg = snapshot.val();
        msg.key = snapshot.key;
        this.messages.push(msg);
      }
			this.scroll();
    });
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
		this.chatMessage = "";
  	this.scroll();
		}
	}	

	findAMentor() {
		this.openModal()
	}

	async checkMentorAdded() {
		firebase.database().ref("chats/" + this.chatId + "/type").on("value", snapshot => {
			if (snapshot.val() === "mentor") this.mentorAdded = true;
			else this.mentorAdded = false;
		})
	}

	public async informMentee() {
		const modal = await this.modalController.create({
			component: InformmenteePage,
			componentProps: {}
		})
		return await modal.present();
	}

	public async openModal() {
		const modal = await this.modalController.create({
	    component: ModalPage,
	    componentProps: {}
		});
		return await modal.present();	
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
