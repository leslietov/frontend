import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BandejaComponent } from './bandeja.component';

const routes: Routes = [
  {
    path: '',
    component: BandejaComponent,
    data: {
      title: 'Bandeja'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandejaRoutingModule {}