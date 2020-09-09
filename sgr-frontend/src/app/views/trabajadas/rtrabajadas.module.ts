import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RtrabajadasComponent } from './rtrabajadas.component';
import { RtrabajadasRoutingModule } from './rtrabajadas-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    RtrabajadasRoutingModule,
    FormsModule ,
    CommonModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    PdfViewerModule
  ],
  declarations: [ RtrabajadasComponent ]
})
export class RtrabajadasModule { }
