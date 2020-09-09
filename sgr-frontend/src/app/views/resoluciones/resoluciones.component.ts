import { Component, ElementRef, Inject, ViewChild, Renderer2 } from '@angular/core';

import { Resolucion } from '../../models/resolucion';
import { Motivo } from '../../models/motivo';
import { Tiporesolucion } from '../../models/tiporesolucion';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalService } from '../../services';
import { ResolucionService } from '../../services/resolucion.service';

import { MotivoService } from '../../services/motivo.service';
import { GLOBAL } from '../../services/global';
import { Dependencia } from '../../models/dependencia';
import { DependenciaService } from '../../services/dependencia.service';
import { TiporesolucionService } from '../../services/tiporesolucion';
import { UserService } from '../../services/user.service';
import { rBusqueda } from "../../models/resolucionDeBusqueda";
import { log } from 'util';






@Component({
  selector: 'app-dashboard',
  templateUrl: './resoluciones.component.html',
  providers: [ResolucionService, MotivoService, DependenciaService, TiporesolucionService, UserService],
  styleUrls: ['./resoluciones.component.css'],
})
export class ResolucionesComponent {
  public pdfSrc: string = '/pdf';

  //Selecciones
  public optionMotivo: Number = 1;
  public optionDependencia: any = null;
  public optionTipo: Number = 1;
  public optionOrigen: Number = null;

  //boolean del modal de resolucion
  public swRatificada: boolean = false;

  //Resolucion de busqueda
  public rbusqueda: rBusqueda;

  public resolucionV: Resolucion;
  tipResolSelec: Number;
  public dato: Number;
  public total;
  public url: string;
  public identity;
  public token;
  public resoluciones: Resolucion[];
  public motivos: Motivo[];
  public motivo: Motivo;
  public dependenciasYunidades: Dependencia[];
  public depYunid: Dependencia;
  public dep: Dependencia;
  public dependencias: Dependencia[];
  public resolucion: Resolucion;
  public tiporesoluciones: Tiporesolucion[];
  public tiporesolucion: Tiporesolucion;
  public tiporesolucion1: Tiporesolucion;
  public status: string;




  public pages;
  public page;
  public page1;
  public page2;
  public next_page;
  public prev_page;

  public pageActual: number = 1;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    public _userService: UserService,
    private _resolucionService: ResolucionService, private _motivoService: MotivoService,
    private _dependenciaService: DependenciaService, private _tiporesolucionService: TiporesolucionService,
    private renderer: Renderer2) {

    this.url = GLOBAL.url;
    this.resolucionV = new Resolucion('', '', '', '', '', '', 0, 0, '', '', 0, 0, 0, 0, '');
    this.rbusqueda = new rBusqueda('', '', '', '', '', '', 0, 0, '', '', 0, 0, 0, '', '', '', 0);

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    //this.initPag();
    // this.getResoluciones();
    //console.log('componente de registro cargado...');
    this.getMotivos(this.page);
    this.getDependencias(this.page1);
    this.getTiporesoluciones(this.page);
    this.getDepYUni(this.page);
    this.changeCodTipo();
    //console.log('dni', localStorage.getItem('dniUsuario'));
  }


  getMotivos(page) {
    this._motivoService.getMotivos(page).subscribe(
      response => {

        if (!response.resolu) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.pages = response.pages;
          this.motivos = response.resolu;
          console.log("motivos", response);
          this.optionMotivo = this.motivos[0].cod_motivo;
          this.changeMotivo();
          if (page > this.pages) {
            this._router.navigate(['/resoluciones', 1]);
          }
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }




  getDependencias(page1) {
    this._dependenciaService.getDependencias(page1).subscribe(
      response => {
        //console.log(response.dep, 'dependencias' );
        if (!response.dep) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.pages = response.pages;
          this.dependencias = response.dep;
          this.resolucionV.codDep = this.dependencias[0].id_area;
          this.changeDependencia();
          if (page1 > this.page2) {
            this._router.navigate(['/resoluciones', 1]);
          }
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }





  getDepYUni(page1) {
    this._dependenciaService.getDepYUni(page1).subscribe(
      response => {
        if (!response.depUni) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.pages = response.pages;
          this.dependenciasYunidades = response.depUni;
          //this.optionOrigen = this.dependenciasYunidades[0].id_area;
          this.changeOficina();
          if (page1 > this.page2) {
            this._router.navigate(['/resoluciones', 1]);
          }
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }


  capturar() {
    this.dato = this.tipResolSelec;
  }


  getTiporesoluciones(page1) {
    this._tiporesolucionService.getTipos(page1).subscribe(
      response => {
        //console.log(response.tipo, 'tipos' );
        if (!response.tipo) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.pages = response.pages;
          this.tiporesoluciones = response.tipo;
          this.optionTipo = this.tiporesoluciones[0].id_tipo_resolucion;
          this.changeTipo();
          if (page1 > this.page2) {
            this._router.navigate(['/resoluciones', 1]);
          }
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  setRatificada(): void {
    this.swRatificada = (this.swRatificada == true) ? false : true;
  }
  changeMotivo() {
    this.resolucionV.motivo_resolucion = this.optionMotivo;
  }

  changeDependencia() {

    if( this.optionDependencia === undefined){
      this.resolucionV.codDep = null;
    }else {
      this.resolucionV.codDep = this.optionDependencia;
    }

  }

  changeTipo() {
    this.resolucionV.tipo_resolucion = this.optionTipo;
  }

  changeOficina() {
    this.resolucionV.oficina_origen = this.optionOrigen;
  }
  changeCodTipo() {
    console.log("CODPERFIL SCA");


    if(this._userService.usuario.codperfil === 231)  this.resolucionV.cod_tipo = 3;
    if(this._userService.usuario.codperfil === 232)  this.resolucionV.cod_tipo = 2;
    if(this._userService.usuario.codperfil === 233)  this.resolucionV.cod_tipo = 1;
    if(this._userService.usuario.codperfil === 234)  this.resolucionV.cod_tipo = 4;
  }


  buscarResolucion() {


    if ( this.optionDependencia === undefined){
      this.resolucionV.codDep = null;
    }else {
      this.resolucionV.codDep = this.optionDependencia;;
    }

    console.log(" codigo de dependencia", this.resolucionV.codDep);

    this.resolucionV.oficina_origen = this.optionOrigen;
    //console.log(this.resolucionV);
    if (this.resolucionV.num_resolucion === '') {
      this.resolucionV.num_resolucion = null;
    }

    if (this.resolucionV.expediente_resolucion === '') {
      this.resolucionV.expediente_resolucion = null;
    }

    //console.log(' Resolucion', this.resolucionV);
    //this.resolucionV.num_resolucion=null;
    // this.resolucionV.codDep=null;
    this._resolucionService.buscarResolucion(this.resolucionV).subscribe(
      response => {
        //console.log(response.reso);
        // console.log(response);

        this.resoluciones = response.resoluciones as Resolucion[];

        //console.log("respuesta de búsqueda", this.resoluciones);
        this.status = 'success';
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  getResolucionPdf(pdf: String) {

    this.pdfSrc = '';
    this.pdfSrc = `http://localhost:8010/api/get-file-resolucion/${pdf}`


  }


}
