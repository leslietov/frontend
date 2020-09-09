import { NgModule, OnInit } from '@angular/core';
import { FormsModule, Validators, FormBuilder } from '@angular/forms';
import { ModalComponent } from '../../directivas';
import { ModalService } from '../../services';

import { ResolucionService } from '../../services/resolucion.service';

import { RegistrarComponent } from './registrar.component';
import { RegistrarRoutingModule } from './registrar-routing.module';


import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DependenciaService } from "../../services/dependencia.service";
import { TiporesolucionService } from "../../services/tiporesolucion";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CustomMaterialModule } from '../../../assets/core-angular-material/material.module'

@NgModule({
  imports: [
    RegistrarRoutingModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    CustomMaterialModule
  ],

  declarations: [RegistrarComponent, ModalComponent],
  providers: [ModalService, ResolucionService, DependenciaService, TiporesolucionService]
})
export class RegistrarModule { }
