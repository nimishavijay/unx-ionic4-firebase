import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdmintabsPage } from './admintabs.page';
import { AdmintabsPageRoutingModule } from './admintabs.router.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
		AdmintabsPageRoutingModule
  ],
  declarations: [AdmintabsPage],
	  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdmintabsPageModule {}
