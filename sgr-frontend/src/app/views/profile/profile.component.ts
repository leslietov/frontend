import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  
  usuario: Usuario;
  tiporesolucion: string = '';
  constructor(
    public _usuarioService: UserService
  ) {
 

  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;

    if(this.usuario.codperfil == 231) {
      this.tiporesolucion="JEFATURAL";
      console.log('...',this.tiporesolucion);
    }
    else {
      if(this.usuario.codperfil == 232) {
        this.tiporesolucion="DECANAL";
        console.log('...',this.tiporesolucion);
      }
      else {
        if(this.usuario.codperfil == 233) {
          this.tiporesolucion="RECTORAL";
          console.log('...',this.tiporesolucion);
        }
        else {
          this.tiporesolucion="DIRECTORAL"
        }
      }
      
    }

    // switch(this.tiporesolucion){
    //   case this.usuario.codperfil='231':
    //       this.tiporesolucion="JEFATURAL";
    //       break;
    //   case '232':
    //     this.tiporesolucion="DECANAL";
    //     break;
    //   case '233':
    //     this.tiporesolucion="RECTORAL";
    //     break;
    //   case '234':
    //     this.tiporesolucion="DIRECTORAL";
    //     break;
  }

  


    // console.log("usuario", this._usuarioService.usuario)
  }


