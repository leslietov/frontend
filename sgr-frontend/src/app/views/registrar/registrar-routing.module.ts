import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarComponent } from './registrar.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: RegistrarComponent,
    data: {
      title: 'Registrar Resolucion'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarRoutingModule {}