import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then(m => m.OffersPageModule)
  },
  {
    path: 'offerdetails/:id',
    loadChildren: () => import('./offerdetails/offerdetails.module').then(m => m.OfferdetailsPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutusPageModule)
  },
  {
    path: 'recipe/:foodname',
    loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },  {
    path: 'nutritions',
    loadChildren: () => import('./nutritions/nutritions.module').then( m => m.NutritionsPageModule)
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
export class PagesRoutingModule { }
