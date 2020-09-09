import {Component, Input, ViewEncapsulation  } from '@angular/core';
import { Bandeja } from '../../models/bandeja';
import { BandejaService } from '../../services/bandejaService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Usuario} from "../../models/usuario";
@Component({
  selector: 'app-dashboard',
  templateUrl: 'bandeja.component.html',
  styleUrls: [],
  providers: [BandejaService]
 
})
export class BandejaComponent {

  //Paginacion
  public pageActual: number =1;

  public bandeja: Bandeja;
  public bandejas: Bandeja[];
    public title: string;
 public status: string;
 public  pdfSrc: string = '';




  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _bandejaService: BandejaService
  ) {

    this.title = 'Registro resolucion prueba';
    this.bandeja = new Bandeja( '', '', '');
   }



  ngOnInit() {
    console.log('componente de registro cargado...');

    this.listarBandejaUsuario();
  }




  listarBandejaUsuario() {
    let user:Usuario = JSON.parse(localStorage.getItem('usuario'));

                              this._bandejaService.listarBandejaUsuario(user['email']).subscribe(
                                response => {
                                  console.log(response.bandeja);
                                   // console.log(response);
                                    this.bandejas = response.bandeja;
                                    this.status = 'success';
                                },
                                error => {
                                  console.log(<any>error);
                                }
                              );
                             }



}
