import { RadioOption } from './radio-option.model';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  /* registrar componente como VALUE ACCESSOR
  Agora vai ser possivel usar ele com ngModel */
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  @Input() options: RadioOption[];
  value: any;

  onChange: any; /*para o metodo registerOnChange*/

  constructor() {}

  ngOnInit() {}

  setValue(value: any) {
    this.value = value;
    this.onChange(this.value);
  }

  /* vai ser chamado pelas diretivas qd elas querem passar um valor para o seu componente */
  writeValue(obj: any): void {
    this.value = obj;
  }
  /* passam uma função e essa funcao vai ser chamada sempre que o valor interno do componente mudar*/
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /* registra que o usuario entrou no seu componente */
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
