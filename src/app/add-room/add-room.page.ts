import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NAMED_ENTITIES } from '@angular/compiler';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})

export class AddRoomPage implements OnInit {

  data: { roomname: string } = { roomname: '' };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addRoom() {
		if (this.data.roomname !== '') {
	    const newData = firebase.database().ref('chatrooms/').push({
	      roomname: this.data.roomname
	  });
		console.log("added"+this.data.roomname);
	  this.router.navigate(['/room']);
  	}
	}
}
// 	TODO 
// DO NOT ALLOW ROOMS WITH THE SAME NAME
