import { ApplicationErrorHandler } from './app.error-handler';
import { AuthInterceptor } from './security/auth.interceptor';
import { LeaveOrderGuard } from './order/leave-order.guard';
import { LoggedInGuard } from './security/loggedin.guard';
import { LoginService } from './security/login/login.service';
import { NotificationService } from './shared/messages/notification.service';
import { CoreModule } from './core/core.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// necessário para registrar um Interceptor na app
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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

/** I18N */
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');

import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';

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
    LoginComponent,
    UserDetailComponent
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

    { provide: LOCALE_ID, useValue: 'pt' },
    FormBuilder,
    NotificationService,
    LoginService,
    LoggedInGuard,
    LeaveOrderGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
