import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Usuario } from '../models/usuario';

import 'rxjs/add/operator/map';
import Swal from 'sweetalert2'
import { environment } from '../../environments/environment';
@Injectable()
export class UserService {
  usuario: Usuario;
  token: string;
  identity: any;

  public url: string;
  public control: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.cargarStorage();
  }

  login(user: Usuario): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', params, { headers: headers }).map(
      (resp: any) => {
        let usuarioDB: Usuario = resp.usuarioModel;
        this.token = resp['token'];
        this.guardarStorage( this.token, usuarioDB);
        return resp;
      });

  }

  getIdentify() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }


  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }


  guardarStorage( token: string, usuario: Usuario) {
    console.log(usuario)
    this.usuario = usuario;
    this.token=token;
   
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      console.log(this.usuario);
    } else {
      this.token = null;
      this.usuario = null;
    }
  }


  actualizarUsuario(usuario: Usuario) {
    // this.cargarStorage()
    let url = environment.URL_SERVICIOS + '/usuario/' + usuario.id;
    url += '?token=' + this.token;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.put(url, usuario, { headers: headers })
  }




  register() {
    console.log(this.url);
  }







}
