import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { ModalComponent } from './components/modal/modal.component';
import { ModalPage } from './pages/modal/modal.page';
import { ModalPageModule } from './pages/modal/modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
		// ModalPageModule
	],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ModalPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
