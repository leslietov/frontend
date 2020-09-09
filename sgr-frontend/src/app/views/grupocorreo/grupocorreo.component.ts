import { Component, OnInit, Inject } from '@angular/core';
import { Grupocorreo } from '../../models/grupocorreo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalService } from '../../services';

import { GrupocorreoService } from '../../services/grupocorreo.service';
import { CorreoComponent } from '../correo/correo.component';
import { Correo } from '../../models/correo';
import { CorreoService } from '../../services/correo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './grupocorreo.component.html',
  styleUrls: ['./grupocorreo.component.css'],
  providers: [GrupocorreoService, CorreoService]
})
export class GrupocorreoComponent {
  //Paginacion
  public pageActual: number =1;

  //usuario
  private user = JSON.parse(localStorage.getItem('usuario'));

  public grupocorreo: Grupocorreo;
  public grupoCorreos: Grupocorreo[];
  //public correos: Correo;
  public Correos: Correo[];
  public title: string;
  public listEmail: string[] = [];

  //DATOS PARA AGREGAR AL EDITAR
  public editName_group: string;
  public editDescription: string;
  public editCorreos: Correo[];

  //Correos para para eliminar de la bd
  public deleteCorreos: Correo[];


  public selectedGroup: Grupocorreo[] = [];


  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _grupocorreoService: GrupocorreoService,
    private _correoService: CorreoService

  ) {
    this.title = 'Registro grupoCorreo prueba';
    this.grupocorreo = new Grupocorreo(0, '', '', this.user['id'], '', '');
    //this.correos = new Correo(0, '', '', 0, '', 0, 0);

    //DATA PARA EDITAR
    this.editCorreos = [];
    this.editName_group = '';
    this.editDescription = '';

    //Correos a eliminar
    this.deleteCorreos = [];
  }

  ngOnInit() {
    console.log('componente de registro Grupo Correo cargado...');
    this.listarGrupos();
  }

  listartCorreos(param: any) {
    this._correoService.listartCorreo(param).subscribe(
      response => {
        console.log(response);
        this.Correos = response.correos;
        this.editCorreos = this.Correos;
        this.status = 'success';
      },
      error => {
        console.log(<any>error);
      }
    );
  }

//   sendEmail(grupoCorreos: Grupocorreo[],emails: string[], modal: any ) {
//     this._correoService.sendEmail(grupoCorreos,emails).subscribe(
//       response => {

//       }
//     );
//     //modal.show();
//  }

deleteEmail(element){
  let indexEmail;

  indexEmail = this.listEmail.findIndex( email => email === element);
  this.listEmail.splice(indexEmail,1);
}

  registrar(form) {
    console.log(form);
    this._grupocorreoService.registrarGrupocorreo(this.grupocorreo, this.listEmail).subscribe(
      response => {
        if (response.grupocorreo && response.grupocorreo.id_grupo) {
          console.log(response.grupocorreo);
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteGrupo(element){
    let indexGroup2;
    console.log(element);
    indexGroup2 = this.grupoCorreos.findIndex( grupocorreo => grupocorreo === element);
    this.grupoCorreos.splice(indexGroup2,1);
    this._grupocorreoService.eliminarGrupo( element.id_group ).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Se eliminó correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        
      }
    );
    
  
      
    this.grupoCorreos.sort(function (a,b) {

      if(a.name_group > b.name_group){
        return 1;
      }
      if(a.name_group < b.name_group){
        return -1;
      }
      return 0;
    });
 }

 editarGrupo( element: Grupocorreo ) {
    this.deleteCorreos = [];
    this.editName_group = element.name_group;
    this.editDescription = element.description;
    //this.editCorreos = this.Correos;
 }

 agregarCorreoModal( grupo: Grupocorreo ) {
    this.editCorreos.push({id_correo:0, email: '', description: grupo.description });
    console.log(this.Correos);
 }

 actualizarGrupo( grupo: Grupocorreo ) {

     // console.log("Informacion de grupo", grupo);

      this._grupocorreoService.editarGrupo( this.editName_group, this.editDescription, grupo.id_group, this.editCorreos, this.deleteCorreos ).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Seactualizó correctamente',
            showConfirmButton: false,
            timer: 1500
          })
            console.log(response);
            if( response['flag'] ){
              this.listarGrupos();
            }
        }
      );
 }

 borrarCorreo ( correo: Correo ) {
    let index = this.editCorreos.findIndex( email => email.email === correo.email );
   this.editCorreos.splice(index, 1);
   this.deleteCorreos.push(correo);
   Swal.fire({
    position: 'center',
    type: 'success',
    title: 'Se eliminó correctamente',
    showConfirmButton: false,
    timer: 1500
  })
 }


  listarGrupos() {
    console.log(this.grupocorreo.id_group + 'id-grupos');
    console.log(this.grupocorreo.name_group + 'nombre-grupos');

    //console.log( this.grupocorreo. + 'numero  resolucion');
    this._grupocorreoService.listartNombreGrupo(this.grupocorreo).subscribe(
      response => {
        console.log(response.grupo);
        console.log(response);
        this.grupoCorreos = response.grupo;
        this.status = 'success';
      },
      error => {
        console.log(<any>error);
      }
    );
  }



}


