import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  { path: 'menteehome', loadChildren: './pages/menteehome/menteehome.module#MenteehomePageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'password', loadChildren: './pages/password/password.module#PasswordPageModule' },
  { path: 'type', loadChildren: './pages/type/type.module#TypePageModule' },
  { path: 'adminchat', loadChildren: './pages/adminchat/adminchat.module#AdminchatPageModule' },
  { path: 'adminhome', loadChildren: './pages/adminhome/adminhome.module#AdminhomePageModule' },
  { path: 'getname', loadChildren: './pages/getname/getname.module#GetnamePageModule' },
  { path: 'mentorassessment', loadChildren: './pages/mentorassessment/mentorassessment.module#MentorassessmentPageModule' },
  { path: 'mentorinfo', loadChildren: './pages/mentorinfo/mentorinfo.module#MentorinfoPageModule' },
  { path: 'mentorcontact', loadChildren: './pages/mentorcontact/mentorcontact.module#MentorcontactPageModule' },
  { path: 'mentorhome', loadChildren: './pages/mentorhome/mentorhome.module#MentorhomePageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  // { path: 'admintabs', loadChildren: './pages/admintabs/admintabs.module#AdmintabsPageModule' },
  // { path: 'viewdetails', loadChildren: './pages/viewdetails/viewdetails.module#ViewdetailsPageModule' },
  // { path: 'feedback', loadChildren: './pages/feedback/feedback.module#FeedbackPageModule' },
  // { path: 'informmentee', loadChildren: './pages/informmentee/informmentee.module#InformmenteePageModule' },
  // { path: 'modal', loadChildren: './pages/modal/modal.module#ModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
