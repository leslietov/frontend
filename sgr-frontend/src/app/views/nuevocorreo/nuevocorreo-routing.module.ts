import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoCorreoComponent } from './nuevocorreo.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: NuevoCorreoComponent,
    data: {
      title: 'Nuevo Grupo Correo '
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoCorreoRoutingModule {}