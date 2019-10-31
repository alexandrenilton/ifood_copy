import { RadioOption } from './../shared/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MONEY' },
    { label: 'Cartão Débito', value: 'DEBITO' },
    { label: 'Cartão de Crédito', value: 'CREDITO' },
    { label: 'Cartão Refeição - Sodexo', value: 'SODEXO' }
  ];
  constructor() {}

  ngOnInit() {}
}
