import { ResolucionTrabajada } from '../models/resolucionTrabajada';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';



@Injectable()
export class ResolucionTrabajadaService {
    public url: string;

    constructor(public _http: HttpClient) {this.url = GLOBAL.url;

    }





        listarResolucionTrabajadas(email): Observable<any> {
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
             // .set('Authorization',this.getToken()) ;
         // tslint:disable-next-line:max-line-length
         return this._http.get(this.url + 'resolucionesTrabajadas/' + email , {headers: headers});
         }


}
