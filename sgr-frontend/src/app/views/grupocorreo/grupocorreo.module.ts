import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ModalComponent } from '../../directivas';
import { ModalService } from '../../services';

import { GrupocorreoService } from '../../services/grupocorreo.service';

import { GrupocorreoComponent } from './grupocorreo.component';
import { GrupocorreoRoutingModule } from './grupocorreo-routing.module';


import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    GrupocorreoRoutingModule,
    FormsModule ,
    CommonModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],

  declarations: [ GrupocorreoComponent],
  providers : [ModalService, GrupocorreoService]
})
export class GrupocorreoModule { }
