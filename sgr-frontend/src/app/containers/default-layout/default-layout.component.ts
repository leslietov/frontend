import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../../_nav';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [
    AuthService,
    UserService
  ]
})
export class DefaultLayoutComponent implements OnInit {

  ngOnInit(): void {
    
  }

  usuario: Usuario;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _userService: UserService
  ) {

  
  }

  parseJwt(token) {
    try {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return ({
        'message': 'error'
      })
    }
  }

  logoutUser() {
    var payload = this.parseJwt(window.localStorage.getItem('token'));
    let user = { usuario: payload.usuario }
    this._authService.logoutUser(user).subscribe(
      response => {
        if (response) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("usuario");
          this._router.navigate(['']);
        }
      },
      error => {
        alert(error)
      }
    )
  }

  irPerfil() {
    this._router.navigate(['/perfil']);
  }
}
