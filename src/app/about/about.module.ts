import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';

/* diz qual vai ser o componente principal da rota /about */
const ROUTES: Routes = [
  { path: '', component: AboutComponent }
]

@NgModule({
  declarations: [AboutComponent],

  /* importar as rotas desse modulo acima declarado*/
  imports: [RouterModule.forChild(ROUTES)]
})
export class AboutModule {

}
