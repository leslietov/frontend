import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Dependencia } from '../models/dependencia';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Grupocorreo } from "../models/grupocorreo";
import { Correo } from '../models/correo';
import {Usuario} from "../models/usuario";




@Injectable()
export class CorreoService {

  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  sendEmail(groups: Grupocorreo[], emails: string[], resolucion: String): Observable<any> {
    let user:Usuario = JSON.parse(localStorage.getItem('usuario'));
    return this._http.post(this.url + 'sendMail', { groups: groups, emails: emails, resolucion: resolucion, origen: user['email'] });
  }

  listartCorreo(params: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'listarcorreo?params=' + params, { headers: headers });
  }


}
