import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Resolucion } from '../models/resolucion';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import {rBusqueda} from "../models/resolucionDeBusqueda";
import {Usuario} from "../models/usuario";
import {PersonaAsociada} from "../models/personaAsociada";




@Injectable()
export class ResolucionService {

    public url: string;

                            constructor(public _http: HttpClient) {this.url = GLOBAL.url;

                            }


                            registrarResolucion(resolucion: Resolucion, personaAsociada: PersonaAsociada){
                              let formdata = new FormData();
                              console.log(resolucion.pdf_resolucion);
                              this.formDataConvert(resolucion,personaAsociada,formdata);
                              let userId: Usuario = JSON.parse(localStorage.getItem('usuario'));
                              //formdata.append("archivo",resolucion.pdf_resolucion);
                              //formdata.append("id","12");
                              console.log("data", formdata);
                            const headers = new HttpHeaders().set('Content-Type','application/json');
                               return this._http.post(this.url + 'registrarResolucion/' + userId.email, formdata ) ;
                            }



                            updateResolucion(resolucion: Resolucion): Observable<any> {
                                const params = JSON.stringify(resolucion);
                                const headers = new HttpHeaders().set('Content-Type','application/json');
                                // .set('Authorizatoion', this.getToken() );
                                // tslint:disable-next-line:max-line-length
                                return this._http.put(this.url + 'update-resoluciones/' + resolucion.id_resolucion, params, { headers: headers});
                            }




                            getResoluciones(page = null): Observable<any> {
                                const headers = new HttpHeaders().set('Content-Type','application/json');
                                // .set('Authorization',this.getToken()) ;
                            return this._http.get(this.url + 'resoluciones/' + page , { headers: headers});
                            }


                            getResolucion(id): Observable<any> {
                                const headers = new HttpHeaders().set('Content-Type','application/json');
                                // .set('Authorization',this.getToken()) ;
                            return this._http.get(this.url + 'resolucion/' + id , { headers: headers});
                            }


                            deleteResolucion(id): Observable<any> {
                                const headers = new HttpHeaders().set('Content-Type', 'Application/json');
                                // .set('Authorization',this.getToken()) ;
                                return this._http.delete(this.url + 'resolucion/' + id , {headers: headers});
                            }

                            buscarResolucion(resolucion: Resolucion): Observable<any> {
                               const headers = new HttpHeaders().set('Content-Type', 'application/json');
                                // .set('Authorization',this.getToken()) ;
                            // tslint:disable-next-line:max-line-length
                            return this._http.post(this.url + 'buscarresoluciones' , resolucion);
                            }

                            getPdfResolucion(linkResolucion: String): Observable<any>{
                              return this._http.post(this.url + 'get-pdf-resolucion', {resolucion: linkResolucion})
                            }

                            formDataConvert(resolucion: Resolucion, personaAsociada:PersonaAsociada, form: FormData){
                              form.append("id_resolucion", resolucion.id_resolucion);
                              form.append("num_general_resolucion", resolucion.num_general_resolucion);
                              form.append("num_resolucion", resolucion.num_resolucion);
                              form.append("expediente_resolucion", resolucion.expediente_resolucion);
                              form.append("fecha_resolucion", resolucion.fecha_resolucion);
                              form.append("descripcion_resolucion", resolucion.descripcion_resolucion);
                              form.append("oficina_origen", resolucion.oficina_origen.toString());
                              form.append("motivo_resolucion", resolucion.motivo_resolucion.toString());
                              form.append("pdf_resolucion", resolucion.num_general_resolucion);
                              form.append("anexo_resolucion", resolucion.anexo_resolucion);
                              form.append("tipo_resolucion", resolucion.tipo_resolucion.toString());
                              form.append("id_area", resolucion.id_area.toString());
                              //form.append("codDep", resolucion.codDep.toString());
                              //form.append("codDep", resolucion.);
                              form.append("file_resolucion", resolucion.pdf_resolucion);

                              //Persona asociada
                              form.append("per_nombre", personaAsociada.nombres);
                              form.append("per_apellido", personaAsociada.apellidos);
                              form.append("per_dni", personaAsociada.dni);
                            }

}
