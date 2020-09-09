import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { GLOBAL } from './global';

@Injectable()
export class AuthService {
    url
    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
        this.url = GLOBAL.url;
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    logoutUser(correo) {
        let parametro = {usuario: correo};
        // console.log(parametro);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'logout', parametro, { headers: headers });
    }

    getToken() {
        return localStorage.getItem('token');
    }

    

}