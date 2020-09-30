import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionsPage } from './nutritions.page';

const routes: Routes = [
  {
    path: '',
    component: NutritionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionsPageRoutingModule {}
