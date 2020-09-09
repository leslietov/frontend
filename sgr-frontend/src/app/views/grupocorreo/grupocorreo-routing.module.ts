import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupocorreoComponent } from './grupocorreo.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: GrupocorreoComponent,
    data: {
      title: 'Nuevo Grupo Correo '
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupocorreoRoutingModule {}
