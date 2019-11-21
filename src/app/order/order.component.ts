import { tap } from 'rxjs/operators';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from './../shared/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;

  delivery: number = 8;

  numberPattern = /^[0-9]*$/;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MONEY' },
    { label: 'Cartão Débito', value: 'DEBITO' },
    { label: 'Cartão de Crédito', value: 'CREDITO' },
    { label: 'Cartão Refeição - Sodexo', value: 'SODEXO' }
  ];

  orderId: string;

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailNotMatch: true };
    } else {
      // console.log(`${email.value} diferente de ${emailConfirmation.value}`);
    }
    return undefined;
  }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    /*
    this.orderForm = this.formBuilder.group({
      // name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur'
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.email]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('',
        [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOptions: this.formBuilder.control('', [Validators.required])
    },
    { validator: OrderComponent.equalsTo });
    */
    this.orderForm = new FormGroup({
      // name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.email]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('',
        [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOptions: this.formBuilder.control('', [Validators.required])
    },
      { validators: [OrderComponent.equalsTo], updateOn: 'blur' });
  }


  /* pra ser passado para o componente delivery-costs*/
  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
    );
    this.orderService.checkOrder(order)
      .pipe(
        tap((orderId: string) => {
          this.orderId = orderId;
        })
      )
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary']);
        this.orderService.clear();
      });
    console.log(order);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }
}
