import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'mentorhome', pathMatch: 'full' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'menteehome', loadChildren: './menteehome/menteehome.module#MenteehomePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'add-room', loadChildren: './add-room/add-room.module#AddRoomPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
  { path: 'type', loadChildren: './type/type.module#TypePageModule' },
  { path: 'adminchat', loadChildren: './adminchat/adminchat.module#AdminchatPageModule' },
  { path: 'adminhome', loadChildren: './adminhome/adminhome.module#AdminhomePageModule' },
  { path: 'getname', loadChildren: './getname/getname.module#GetnamePageModule' },
  { path: 'mentorassessment', loadChildren: './mentorassessment/mentorassessment.module#MentorassessmentPageModule' },
  { path: 'mentorinfo', loadChildren: './mentorinfo/mentorinfo.module#MentorinfoPageModule' },
  { path: 'mentorcontact', loadChildren: './mentorcontact/mentorcontact.module#MentorcontactPageModule' },
  { path: 'mentorhome', loadChildren: './mentorhome/mentorhome.module#MentorhomePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
