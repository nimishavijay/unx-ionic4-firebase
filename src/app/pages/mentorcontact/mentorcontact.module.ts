import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MentorcontactPage } from './mentorcontact.page';

const routes: Routes = [
  {
    path: '',
    component: MentorcontactPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MentorcontactPage]
})
export class MentorcontactPageModule {}
