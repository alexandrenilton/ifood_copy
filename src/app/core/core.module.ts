import { OrderService } from './../order/order.service';
import { RestaurantsService } from './../restaurantes/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.services';
import { NgModule } from "@angular/core";

@NgModule({
  providers: [ShoppingCartService, RestaurantsService, OrderService]
})
export class CoreModule { }
