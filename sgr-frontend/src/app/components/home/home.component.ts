import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {

  constructor(
    public _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {

    // else {
    //   this._router.navigate(['/registros']);
    // }
  }
  

}

