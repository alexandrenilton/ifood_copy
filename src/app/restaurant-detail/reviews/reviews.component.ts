import { Observable } from 'rxjs/Observable';
import { RestaurantsService } from './../../restaurantes/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {
  reviews: Observable<any>;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /** acessar o params do parent da route */
    let id = this.route.parent.snapshot.params['id'];
    this.reviews = this.restaurantsService.reviewsOfRestaurant(id);
  }
}
