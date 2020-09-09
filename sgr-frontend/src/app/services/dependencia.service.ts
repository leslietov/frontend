import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Dependencia } from '../models/dependencia';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';




@Injectable()
export class DependenciaService {

    public url: string;

                            constructor(public _http: HttpClient) {this.url = GLOBAL.url;

                            }

                            getDependencias(page = null): Observable<any> {
                                const headers = new HttpHeaders().set('Content-Type','application/json');
                                // .set('Authorization',this.getToken()) ;
                            return this._http.get(this.url + 'dependencias-all', { headers: headers});
                            }



                            getDepYUni(page = null): Observable<any> {
                                const headers = new HttpHeaders().set('Content-Type','application/json');
                                // .set('Authorization',this.getToken()) ;
                            return this._http.get(this.url + 'dependenciasYunidades-all', { headers: headers});
                            }
}
