import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Motivo } from '../models/motivo';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';




@Injectable()
export class MotivoService {

    public url: string;

                            constructor(public _http: HttpClient) {this.url = GLOBAL.url;

                            }

                            getMotivos(page = null): Observable<any> {
                                const headers = new HttpHeaders().set('Content-Type','application/json');
                                // .set('Authorization',this.getToken()) ;
                            return this._http.get(this.url + 'motivos-all', { headers: headers});
                            }

}
