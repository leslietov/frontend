import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResolucionesComponent } from './resoluciones.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ResolucionesComponent,
    data: {
      title: 'Buscar Resolucion'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolucionesRoutingModule {}
