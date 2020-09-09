import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { ModalService } from '../../services';

import { GrupocorreoService } from '../../services/grupocorreo.service';

import { NuevoCorreoComponent } from './nuevocorreo.component';
import { NuevoCorreoRoutingModule } from './nuevocorreo-routing.module';


import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CustomMaterialModule } from '../../../assets/core-angular-material/material.module';


@NgModule({
  imports: [
    NuevoCorreoRoutingModule,
    FormsModule ,
    CommonModule,
    CustomMaterialModule
  ],

  declarations: [ NuevoCorreoComponent],
  providers : [ModalService, GrupocorreoService]
})
export class NuevoCorreoModule { }
