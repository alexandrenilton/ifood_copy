import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurantes',
  templateUrl: './restaurantes.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantesComponent implements OnInit {
  searchBarState = 'hidden'; /* define o stato inicial da animação */
  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    // reactive forms: para o search bar
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });
    this.searchControl.valueChanges
      .debounceTime(500) /* so vai seguir se a difença do valor anterior pro atual passou 500ms*/
      .distinctUntilChanged()
      .switchMap(searchTerm =>
        this.restaurantsService
          .restaurants(searchTerm)
          .catch(error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantsService
      .restaurants()
      .subscribe(restaurants => (this.restaurants = restaurants));
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}
