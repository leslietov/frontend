import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { BandejaComponent } from './bandeja.component';
import { BandejaRoutingModule } from './bandeja-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    BandejaRoutingModule,
    FormsModule ,
    CommonModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    PdfViewerModule
  ],
  declarations: [ BandejaComponent ]
})
export class BandejaModule { }
