import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MentorassessmentPage } from './mentorassessment.page';

const routes: Routes = [
  {
    path: '',
    component: MentorassessmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MentorassessmentPage]
})
export class MentorassessmentPageModule {}
