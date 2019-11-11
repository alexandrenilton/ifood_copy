import { LoginService } from './security/login/login.service';
import { NotificationService } from './shared/messages/notification.service';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { RestaurantComponent } from './restaurantes/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { FormBuilder } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './security/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RestaurantesComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    SharedModule, /*nele ja importo e re-importo FormsModule e ReactiveFormsModule */
    CoreModule, /* importei CoreModule pq ele tem o providers de todos os services abaixo comentados*/
  ],
  providers: [
    // RestaurantsService,
    // ShoppingCartService,
    // OrderService,
    /** usar estrategia # localhost:8080/#/ para suportar browser http simples
        para entrrar com URL e ele nao se perder (404) */
    // { provide: LocationStrategy, useClass: HashLocationStrategy },

    { provide: LOCALE_ID, useValue: 'pt-BR' },
    FormBuilder,
    NotificationService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
