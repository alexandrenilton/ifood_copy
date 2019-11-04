import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, RatingComponent,
    /** re-importação */
    CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {

}
