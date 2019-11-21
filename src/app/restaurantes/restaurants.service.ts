import { map, switchMap, tap } from 'rxjs/operators';
import { MenuItem } from './../restaurant-detail/menu-item/menu-item.model';

import { Restaurant } from './restaurant/restaurant.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


import { MEAT_API } from './../app.api';

@Injectable() /* pois vai receber o servido Http do angular*/
export class RestaurantsService {
  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;
    if (search) {
      params = new HttpParams().set('q', search);
      /* q eh uma key word pra dizer q vc quer pesquisar em todos os campos */
    }
    return this.http
      .get<Restaurant[]>(`${MEAT_API}/restaurants`, { params: params });
    // .catch(ErrorHandler.handleError);
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http
      .get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
    // .catch(ErrorHandler.handleError);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}/reviews`);
    // .catch(ErrorHandler.handleError);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http
      .get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
    // .catch(ErrorHandler.handleError);
  }
}
