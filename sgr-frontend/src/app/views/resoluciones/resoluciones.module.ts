import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ModalComponent } from '../../directivas';
import { ModalService } from '../../services';

import { ResolucionService } from '../../services/resolucion.service';

import { ResolucionesComponent } from './resoluciones.component';
import { ResolucionesRoutingModule } from './resoluciones-routing.module';
import { CustomMaterialModule } from '../../../assets/core-angular-material/material.module';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MotivoService } from '../../services/motivo.service';
import {ModalsComponent} from '../notifications/modals.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import {PdfViewerModule} from "ng2-pdf-viewer";

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    ResolucionesRoutingModule,
    FormsModule ,
    CommonModule,
    PdfViewerModule,
    CustomMaterialModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],

  declarations: [ ResolucionesComponent,ModalsComponent],
  providers : [ModalService, ResolucionService,MotivoService]
})
export class ResolucionesModule { }
