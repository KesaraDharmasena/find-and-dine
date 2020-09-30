import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'home/tabs',
    component: DashboardComponent,
    children:
      [
        {
          path: 'tab1',
          children:
            [
              {
                path: '',
                loadChildren: './tab1/tab1.module#Tab1PageModule'
              }
            ]
        },
        {
          path: 'tab2',
          children:
            [
              {
                path: '',
                loadChildren: './tab2/tab2.module#Tab2PageModule'
              }
            ]
        },
        {
          path: 'tab3',
          children:
            [
              {
                path: '',
                loadChildren: './tab3/tab3.module#Tab3PageModule'
              }
            ]
        },
        {
          path: '',
          redirectTo: 'tabs/tab1',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: 'home/tabs/tab1',
    pathMatch: 'full'
  },  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  }

];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class DashboardRoutingModule {}
