import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { ModalService } from '../../services';

import { CorreoService } from '../../services/correo.service';

import { CorreoComponent } from './correo.component';
import { CorreoRoutingModule } from './correo-routing.module';


import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomMaterialModule } from '../../../assets/core-angular-material/material.module'

@NgModule({
  imports: [
    CorreoRoutingModule,
    FormsModule ,
    CommonModule,
    ModalModule.forRoot(),
    CustomMaterialModule
  ],
  declarations: [ CorreoComponent],
  providers :[ModalService, CorreoService]
})
export class CorreoModule { }