import { Component, OnInit } from '@angular/core';
/** imports para animação */
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { NotificationService } from './../notification.service';


@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: 0,
      })),
      state('visible', style({
        opacity: 100,
        bottom: '70px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out')),
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!';

  snackVisibility = 'hidden';

  constructor(private notificationService: NotificationService) { }

  // ngOnInit() {
  //   this.notificationService.notifier.subscribe(message => {
  //     this.message = message;
  //     this.snackVisibility = 'visible';
  //     Observable.timer(3000).subscribe(timer => this.snackVisibility = 'hidden');
  //   });
  // }

  ngOnInit() {
    this.notificationService.notifier
      .do(message => {
        this.message = message;
        this.snackVisibility = 'visible';
      }).switchMap(messasge => Observable.timer(3000))
      .subscribe(timer => this.snackVisibility = 'hidden')
  }

  toggleSnack() {
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden';
  }

}
