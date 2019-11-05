import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1 })),

      /*void eh qd o componente nao está na arvore do dom*/
      transition('void => ready', [
        style({ opacity: 0, transform: 'translate(0, -50px)' }),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {
  menuItemState = 'ready';

  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  emitAddEvent() {
    this.add.emit(this.menuItem);
  }
}
