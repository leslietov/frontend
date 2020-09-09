import { Component, Inject } from '@angular/core';
import { Resolucion } from '../../models/resolucion';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalService } from '../../services';
import { ResolucionService } from '../../services/resolucion.service';
import { Motivo } from '../../models/motivo';
import { MotivoService } from '../../services/motivo.service';
import { Dependencia } from "../../models/dependencia";
import { DependenciaService } from "../../services/dependencia.service";
import { TiporesolucionService } from "../../services/tiporesolucion";
import { Tiporesolucion } from "../../models/tiporesolucion";
import { PersonaAsociada } from "../../models/personaAsociada";
import { UserService } from '../../services/user.service';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'registrar.component.html',
  providers: [ResolucionService, MotivoService, UserService]
})

export class RegistrarComponent {
  //temporal para la distribucion
  nResolucion: string;
  

  //Persona asociada
  public perAsociada: PersonaAsociada;
  public nom_per: string;
  public ape_per: string;
  public dni_per: string;

  page: any;
  pages: any;
  total: any;
  primaryModal: any;
  public title: string;
  public motivos: Motivo[];
  public resolucion: Resolucion;
  public status: string;
  public page1;
  public page2;

  //Spinner
  public spin: boolean = false;

  //Dependencias y unidades
  public depYunid: Dependencia[];
  public dependencias: Dependencia[];
  //Tipo de resoluciones
  public tiporesoluciones: Tiporesolucion[];

  //Selecciones
  public optionOrigen: Number;
  public optionMotivo: Number;
  public optionTipo: Number;
  public optionDependencia: Number;

  constructor(
    private _motivoService: MotivoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _resolucionService: ResolucionService,
    private _dependenciaService: DependenciaService,
    private _tipoResolucionService: TiporesolucionService,
    private _userService: UserService

  ) {
    this.title = 'Registro resolucion prueba';
    this.resolucion = new Resolucion('', '', '', '', '', '', 0, 0, '', '', 0, 0, 0, 0, '');
    this.perAsociada = new PersonaAsociada('', '', '');
    this.nom_per = '';
    this.ape_per = '';
    this.dni_per = '';
  }

  ngOnInit() {
    this.getMotivos(this.page);
    this.getDepYunids(this.page);
    this.getTipoResoluciones(this.page);
    this.getDependencias(this.page);
  }

  registrar(form) {

    if (this._userService.usuario.codperfil == 231) {
      this.resolucion.tipo_resolucion = 3;
    }
    if (this._userService.usuario.codperfil == 232) {
      this.resolucion.tipo_resolucion = 2;
    }
    if (this._userService.usuario.codperfil == 233) {
      this.resolucion.tipo_resolucion = 1;
    }
    if (this._userService.usuario.codperfil == 234) {
      this.resolucion.tipo_resolucion = 4;
    }
    this.spin = true;

    if (form.valid) {
      console.log('Resolucion: ', this.resolucion);
      if (this.nom_per === '') {
        this.perAsociada.nombres = '-';
      } else {
        this.perAsociada.nombres = this.nom_per;
      }

      if (this.ape_per === '') {
        this.perAsociada.apellidos = '-';
      } else {
        this.perAsociada.apellidos = this.ape_per;
      }

      if (this.dni_per === '') {
        this.perAsociada.dni = '0';
      } else {
        this.perAsociada.dni = this.dni_per;
      }

      this._resolucionService.registrarResolucion(this.resolucion, this.perAsociada).subscribe(
        response => {
          if (response['id_resolucion']) {
            this.nResolucion = response['num_resolucion'];
            this.spin = false;
            Swal.fire({
              title: 'Se registró con exito',
              text: "¿Deseas distribuirla?",
              type: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si!',
              cancelButtonText: 'no'
            }).then((result) => {
              if (result.value) {
                this._router.navigate(['correo', this.nResolucion ]);
              }
              else {
                this._router.navigate(['/trabajadas']);
              }
            })
            form.reset();
          } else {
            this.spin = false;
            this.status = 'error';
          }

        },
        error => {
          console.log(<any>error);
        }
      );
    } else {
      this.spin = false;
      Swal.fire({
        type: 'error',
        title: 'Falta completar datos',
        text: 'Todos los datos son obligatorios',
      })
    }


  }

  uploadResolucion($e) {
    console.log("archivo: ", $e.target.files);
    this.resolucion.pdf_resolucion = $e.target.files[0];
  }

  getTipoResoluciones(page1) {
    this._tipoResolucionService.getTipos(page1).subscribe(
      response => {
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
      }, error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
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
          this.optionDependencia = this.dependencias[0].id_area;
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

  getDepYunids(page1) {
    this._dependenciaService.getDepYUni(page1).subscribe(
      response => {
        if (!response.depUni) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.pages = response.pages;
          this.depYunid = response.depUni;
          this.optionOrigen = this.depYunid[0].id_area;
          this.changeOficina();

          if (page1 > this.page2) {
            this._router.navigate(['/resoluciones', 1]);
          }
        }
      }, error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  changeDependencia() {
    this.resolucion.id_area = this.optionDependencia;
  }

  changeOficina() {
    this.resolucion.oficina_origen = this.optionOrigen;
  }

  changeMotivo() {
    this.resolucion.motivo_resolucion = this.optionMotivo;
  }

  changeTipo() {
    this.resolucion.tipo_resolucion = this.optionTipo;
  }

  extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\")
      return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
      return path.substr(x + 1);
    x = path.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
      return path.substr(x + 1);
    return path; // just the file name
  }


  getMotivos(page) {
    this._motivoService.getMotivos(page).subscribe(
      response => {
        //  console.log(response.resolu, 'motivos');
        if (!response.resolu) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.pages = response.pages;
          this.motivos = response.resolu;
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

  clean(form) {
    form.reset();
  }

  cancelar() {
    this._router.navigate(['/dashboard']);
  }

}

