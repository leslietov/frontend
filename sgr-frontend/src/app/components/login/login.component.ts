import { Component, OnInit, NgZone } from '@angular/core';
import { Usuario } from '../../models/usuario';

import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

import * as $ from 'jquery';
import { UserService } from '../../services/user.service';

declare global {
  interface Window {
    RTCPeerConnection: RTCPeerConnection;
    mozRTCPeerConnection: RTCPeerConnection;
    webkitRTCPeerConnection: RTCPeerConnection;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'inicioSesion.Component.html',
  styleUrls: ['./inicioSesion.Component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  submitted = false;
  public login: any;

  localIp = sessionStorage.getItem('LOCAL_IP');

  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this.login = new Usuario(null, null, '', '', null, null, null, null, null, null, '110', null, null);
  }

  ngOnInit() {  
    this.determineLocalIp();
    $('#warningCaps').hide();
    if (this._authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  private determineLocalIp() {
    window.RTCPeerConnection = this.getRTCPeerConnection();

    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.createOffer().then(pc.setLocalDescription.bind(pc));
    pc.onicecandidate = (ice) => {
      this.zone.run(() => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return;
        }

        this.localIp = this.ipRegex.exec(ice.candidate.candidate)[1];
        sessionStorage.setItem('LOCAL_IP', this.localIp);
        pc.onicecandidate = () => { };
        pc.close();
      });
    };
  }

  private getRTCPeerConnection() {
    return window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;
  }

  getUserIp() {
    console.log(this.localIp)
  }

  registrarlogin() {
    this.login.ip = this.localIp;
    this._userService.login(this.login).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['dashboard']);
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400 || error.status === 401) {
            console.log('CONTRASEÑA INCORRECTA')
            Swal.fire({
              type: 'error',
              title: 'Contraseña Incorrecta',
              text: 'Digite correctamente sus datos.'
            })
            this.login.contrasena = ''
          }
          if (error.status === 409) {
            console.log('USTED HA INICIADO SESION EN OTRO LADO, DESEA CERRAR ESA SESION?')
            Swal.fire({
              type: 'warning',
              title: 'Usted ha iniciado sesión en otro navegador u ordenador.',
              text: 'Desea cerrar su sesión iniciada y continuar aquí?',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.value){
                this.router.navigate(['/dashboard']);
                this._authService.logoutUser(this.login.email+'@unmsm.edu.pe').subscribe(
                  response => {
                    if(response){
                      this._userService.login(this.login).subscribe(
                        response => {
                          localStorage.setItem('token', response.token);
                          this.router.navigate(['dashboard']);
                        },
                        error=>{
                          console.log(error);
                        }
                      );
                    }
                  },
                  error => {
                    console.log(error);
                  }
                );
              }
            }).catch(error => {
              console.log(error);
            })
          }
        }
      }
    );
  }



  manejarSesion() {
    this.login = this.registerForm.value;
    this.login.email = this.login.email;
    (<any>$.extend(true, this.login, { 'usuario': this.login.email + '@unmsm.edu.pe' }));
    let next: boolean;
    // this._loginService.logout(this.login).toPromise().then(
    //   response => {
    //     return next = true;
    //   },
    //   error => {
    //     this.router.navigate(['']);
    //   }
    // ).then(
    //   next => {
    //     if (next) {
    //       this._loginService.login(this.login).subscribe(
    //         response => {
    //           window.localStorage.setItem('access_token', response.token);
    //           window.location.reload();
    //         },
    //         error => {
    //           this.router.navigate(['']);
    //         });
    //     }
    //   }
    // )
  }
}
