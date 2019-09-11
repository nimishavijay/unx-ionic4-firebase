import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdmintabsPage } from './admintabs.page';

const routes: Routes = [
  {
    path: '',
    component: AdmintabsPage,
		children: [
      {
        path: 'adminhome',
        children: [
          {
            path: '',
            loadChildren: '../adminhome/adminhome.module#AdminhomePageModule'
          }
        ]
      },
      {
        path: 'mentorapproval',
        children: [
          {
            path: '',
            loadChildren: '../mentorapproval/mentorapproval.module#MentorapprovalPageModule'
          }
        ]
      },
			{
        path: '',
        redirectTo: '/admintabs/adminhome',
        pathMatch: 'full'
      }
		]
	},
	{
    path: '',
    redirectTo: '/admintabs/adminhome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
	  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdmintabsPageRoutingModule {}
