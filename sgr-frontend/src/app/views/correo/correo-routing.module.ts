import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorreoComponent } from './correo.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: CorreoComponent,
    data: {
      title: 'Correo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorreoRoutingModule {}