import { MEAT_API } from './../app.api';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.services';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(private cartService: ShoppingCartService, private http: HttpClient) { }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  itemsValue(): number {
    return this.cartService.total();
  }

  clear() {
    this.cartService.clear();
  }

  checkOrder(order: Order): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post<Order>(`${MEAT_API}/orders`, order)
      .map(order => order.id);
  }
}
