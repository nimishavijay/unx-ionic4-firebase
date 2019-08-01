import { Component, OnInit } from '@angular/core';
//import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getname',
  templateUrl: './getname.page.html',
  styleUrls: ['./getname.page.scss'],
})
export class GetnamePage implements OnInit {

	currentUser: any = {
		key: '',
		name: ''
	};

	name: string;

  constructor(
		private router: Router
	) { }

  ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
    	if (user) {
				console.log('---GET NAME---');
    	  firebase.database().ref('users/').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value', snapshot => {
					snapshot.forEach((data) => {
						this.currentUser.name = data.val().username;
						this.currentUser.key =  data.key;
						console.log('currentUser: ', this.currentUser);
					})
				})
			} else this.router.navigate(['/signin']);
		})
  }

	goBack() {
    this.router.navigate(['/menteehome']);
  }

	async adminChat() {
		var adminId: string;
		firebase.database().ref('admins/').orderByChild("requests").limitToFirst(1).once("value", snapshot => {
			snapshot.forEach(data => {
				data.child("requests").ref.transaction((currentrequests) => { 
					adminId = data.key;
					return currentrequests + 1 
				}).then(() => console.log(adminId, data.val()))
			})
		})

		/* not working from here for some reason? */

		const newData = firebase.database().ref("adminchats/").push();
		await newData.set({
			adminId: adminId,
			menteeId: this.currentUser.key,
			menteeName: this.name
		}).then(() => console.log("pushed to adminschats/"))
		await firebase.database().ref("mentees/" + this.currentUser.key + "/adminchats/" + newData.key).set({
			adminId: adminId,
			menteeName: this.name
		})
		await firebase.database().ref("admins/" + adminId + "/chats/" + newData.key).set({
			menteeId: this.currentUser.key,
			menteeName: this.name
		})
	}

}
