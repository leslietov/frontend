import { Grupocorreo } from '../models/grupocorreo';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import {Usuario} from "../models/usuario";
import {Correo} from "../models/correo";



@Injectable()
export class GrupocorreoService {
    public url: string;

    constructor(public _http: HttpClient) {this.url = GLOBAL.url;

    }

    registrarGrupocorreo(grupocorreo : Grupocorreo, correos: string []): Observable<any> {
      let userId: Usuario = JSON.parse(localStorage.getItem('usuario'));
      grupocorreo.email_usuario = userId.email;
        let params = JSON.stringify(grupocorreo);
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'registrarGrupocorreo',
          {
            grupo_correo: grupocorreo,
            correos: correos
          }
          , { headers: headers }) ;
        }


      editarGrupo( name_group: string, description: string, id_group:Number, editCorreos: Correo[], deleteCorreos: Correo[]) {
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'editarGrupo',
          {
            id_group: id_group,
            name_group: name_group,
            description: description,
            correos: editCorreos,
            delete: deleteCorreos
          }
          , { headers: headers }) ;
      }





        sendEmail(groups: Grupocorreo[], emails: string[]): Observable<any> {
            return this._http.post(this.url + 'sendMail', { groups: groups, emails: emails });
          }



        listartGrupoCorreo(grupocorreo: Grupocorreo): Observable<any> {
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
             // .set('Authorization',this.getToken()) ;
         // tslint:disable-next-line:max-line-length
         return this._http.get(this.url + 'listarGrupoCorreo/' , {headers: headers});
         }


         listartNombreGrupo(grupocorreo: Grupocorreo): Observable<any> {
           let userId: Usuario = JSON.parse(localStorage.getItem('usuario'));
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
             // .set('Authorization',this.getToken()) ;
         // tslint:disable-next-line:max-line-length
         return this._http.get(this.url + `listarCorreoNombre/${ userId.email }` , {headers: headers});
         }

         eliminarGrupo( id_group: Number ): Observable<any> {
           const headers = new HttpHeaders().set('Content-Type', 'application/json');
           return this._http.post(this.url + `eliminarGrupo` , {id_group: `${id_group}`} , {headers: headers});
         }
}
