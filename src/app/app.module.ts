import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { ModalComponent } from './components/modal/modal.component';
// import { ModalPage } from './pages/modal/modal.page';
import { ModalPageModule } from './pages/modal/modal.module';
import { InformmenteePageModule } from './pages/informmentee/informmentee.module';
import { FeedbackPageModule } from './pages/feedback/feedback.module';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
		BrowserModule, 
		IonicModule.forRoot(), 
		AppRoutingModule, 
		IonicRatingModule,
		ModalPageModule,
		InformmenteePageModule,
		FeedbackPageModule
	],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
