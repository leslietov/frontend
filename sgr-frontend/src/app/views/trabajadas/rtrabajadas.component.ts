import { Component, Inject } from '@angular/core';
import { ResolucionTrabajada } from '../../models/resolucionTrabajada';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalService } from '../../services';
import { ResolucionTrabajadaService } from '../../services/resolucionTrabajadaService';
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'rtrabajadas.component.html',
  styleUrls: [],
  providers: [ResolucionTrabajadaService]

})
export class RtrabajadasComponent {

  //Paginacion
  public pageActual: number =1;

  title: string;
  public resolucionTrabajada: ResolucionTrabajada;
  public resolucionTrabajadas: ResolucionTrabajada[];
  public status: string;
  public  pdfSrc: string = '';

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _resolucionTrabajadaService: ResolucionTrabajadaService
  ) {

    this.title = 'Registro resolucion prueba';
    this.resolucionTrabajada = new ResolucionTrabajada( "","","","","","","","", 0, 0,"","");

   }

  ngOnInit() {
    console.log('componente de registro cargado...');


    //console.log('dni', localStorage.getItem('dniUsuario'));
    this.listarResolucionesTrabajadas();
  }


  listarResolucionesTrabajadas() {
                              let userId: Usuario = JSON.parse(localStorage.getItem('usuario'));
                              this._resolucionTrabajadaService.listarResolucionTrabajadas(userId.email).subscribe(
                                response => {
                                  console.log(response.trabajadas);
                                    this.resolucionTrabajadas = response.Resoluciones;
                                  console.log(this.resolucionTrabajadas);
                                    this.status = 'success';
                                },
                                error => {
                                  console.log(<any>error);
                                }
                              );
                             }

  getResolucionPdf(pdf:  String){

    this.pdfSrc = '';


    this.pdfSrc = `http://localhost:8010/api/get-file-resolucion/${pdf}`


  }


}
