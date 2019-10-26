import { Restaurant } from './../restaurantes/restaurant/restaurant.model';
import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from './../restaurantes/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // let id = this.route.snapshot.params['id'];
    // console.log(`Id.: ${id}`);
    this.restaurantsService
      .restaurantById(this.route.snapshot.params['id'])
      .subscribe(res => (this.restaurant = res));
  }
}
