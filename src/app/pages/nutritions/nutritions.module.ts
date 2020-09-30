import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutritionsPageRoutingModule } from './nutritions-routing.module';

import { NutritionsPage } from './nutritions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NutritionsPageRoutingModule
  ],
  declarations: [NutritionsPage]
})
export class NutritionsPageModule {}
