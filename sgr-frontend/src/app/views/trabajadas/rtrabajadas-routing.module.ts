import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RtrabajadasComponent } from './rtrabajadas.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: RtrabajadasComponent,
    data: {
      title: 'Resoluciones trabajadas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtrabajadasRoutingModule {}
