// import { Component, Inject } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ModalService } from '../../services';
// import { Usuario } from '../../models/usuario';
// import { UserService } from '../../services/user.service';
// import { error } from '@angular/compiler/src/util';


// @Component({
//   selector: 'app-dashboard',
//   templateUrl: 'inicioSesion.component.html',
//   styleUrls: ['./inicioSesion.Component.css'],
//   providers: [UserService]
// })
// export class InicioSesionComponent {

//   public title: String;
//   public user: Usuario;
//   public status: String;
//   public identity: Usuario;
//   public token;
//   public ip;
//   public oli;
//   public aplicacion;


//   constructor(
//     private _route: ActivatedRoute,
//     private _router: Router,
//     private _usuarioService: UserService
//   ) {
//     this.title = 'Identificate';
//     this.user = new Usuario('', '', '', '', 'ROLE_USER', '', '', '', '', '', '', '', 0 );
//     this.oli = localStorage.getItem('ip');
//     this.aplicacion = localStorage.getItem('aplicacion');
//   }




//   // tslint:disable-next-line:use-life-cycle-interface
//   ngOnInit() {

//     console.log('Componente de login cargando...');
//    // this.ip = localStorage.getItem('ip');
//   }



//   onSubmit() {
//     this._usuarioService.login(this.user).subscribe(
//       response => {
//         this.identity = response.user;

//         if (!this.identity || !this.identity.id) {
//           this.status = 'error';
//         } else {
//           this.status = 'success';
//           localStorage.setItem('identity', JSON.stringify(this.identity));
//           this.getToken();
//         }
//       },
//       error => {
//         const errorMessage = <any>error;
//         console.log(errorMessage);

//         if (errorMessage != null) {
//           this.status = 'error';
//         }

//       }
//     );
//   }




//   getToken() {
//     this._usuarioService.login(this.user, 'true').subscribe(
//       response => {
//         this.token = response.token;
//         console.log(this.token);

//         if (this.token.length <= 0) {
//           this.status = 'error';
//         } else {
//           this.status = 'success';
//           localStorage.setItem('token', this.token);
//         }
//       },
//       // tslint:disable-next-line:no-shadowed-variable
//       error => {
//         const errorMessage = <any>error;
//         console.log(errorMessage);

//         if (errorMessage != null) {
//           this.status = 'error';
//         }

//       }


//     );
//   }




//   registrarlogin() {
//    this.user.ip = this.oli;
//    this.user.aplicacion = '110';
//         this._usuarioService.registrarlogin(this.user).subscribe(
//           response => {
//             console.log('login');
//          console.log(response);
//          localStorage.setItem('dniUsuario',response.dniUsuario);
//          this._router.navigate(['dashboard']);
//         if (response.user && response.user.id) {
//           console.log(response.user);
//           this.status = 'success';
//         } else {
//           this.status = 'error';
//         }
//       },
//       error => {
//         console.log(<any>error);
//       }
//     );
//   }



// }
