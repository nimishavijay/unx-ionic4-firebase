import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NAMED_ENTITIES } from '@angular/compiler';
import { RoomPage } from '../room/room.page' ;

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})

export class AddRoomPage implements OnInit {

  users = [];

  constructor(private router: Router) { }

  async ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				var activeUserKey = firebase.auth().currentUser.uid;
				firebase.database().ref('users/').on('value', resp => {
					this.users = [];
					resp.forEach(child => {						
						const user = child.val();
						console.log(user);
						user.key = child.key;
						this.users.push(user);						
					})
				})
			} else {
				this.router.navigate(['/signin']);
			}
		});
  }

	goBack() {
		this.router.navigate(['/room']);
	}

}
