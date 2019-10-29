import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterContentInit
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() okMessage = 'Ok';
  @Input() errorMessage: string;
  @Input() label: string;

  /** referencia que vai ser pega */
  @ContentChild(NgModel) model: NgModel;

  input: any;
  constructor() {}

  ngOnInit() {}

  /* chamado qd o conteudo for definido, o conteudo que ficará em NgContent*/
  ngAfterContentInit() {
    this.input = this.model;
    if (this.input === undefined) {
      throw new Error(
        'Esse componente precisa ser usado com uma diretiva ngModel'
      );
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}
