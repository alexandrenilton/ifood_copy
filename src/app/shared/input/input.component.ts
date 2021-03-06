import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterContentInit
} from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() okMessage = 'Ok';
  @Input() errorMessage: string;
  @Input() label: string;
  @Input() showTip: boolean = true;

  /** referencia que vai ser pega */
  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  input: any;
  constructor() { }

  ngOnInit() { }

  /* chamado qd o conteudo for definido, o conteudo que ficará em NgContent*/
  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error(
        'Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName'
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
