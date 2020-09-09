import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { Router } from '@angular/router';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AuthService
  ]
})

export class AppComponent implements OnInit {
  constructor(
    public _authService: AuthService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

}
