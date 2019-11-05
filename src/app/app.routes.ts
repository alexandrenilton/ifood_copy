import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  // { path: 'about', component: AboutComponent },
  /* fazendo lazy-loading para about*/
  { path: 'about', loadChildren: './about/about.module.ts#AboutModule' },

  {
    path: 'restaurantes', component: RestaurantesComponent
  },

  {
    path: 'restaurantes/:id',
    component: RestaurantDetailComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'reviews', component: ReviewsComponent }
    ]
  },
  { path: 'order', loadChildren: './order/order.module.ts#OrderModule' },
  { path: '**', component: NotFoundComponent }
];
