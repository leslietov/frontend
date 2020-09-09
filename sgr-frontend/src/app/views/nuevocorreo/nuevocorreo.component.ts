import { Component, OnInit, Inject } from '@angular/core';

import { Grupocorreo } from '../../models/grupocorreo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalService } from '../../services';
import Swal from 'sweetalert2';

import { GrupocorreoService } from '../../services/grupocorreo.service';

declare var $: any

@Component({
  selector: 'app-dashboard',
  templateUrl: './nuevocorreo.component.html',
  styleUrls: ['./nuevocorreo.component.css'],
  providers: [GrupocorreoService]
})
export class NuevoCorreoComponent {
  //usuario
  private user = JSON.parse(localStorage.getItem('usuario'));

  public optionGroup: Number;
  public spin: boolean = false;
  public grupocorreo: Grupocorreo;
  public correosGrupal: Grupocorreo[];
  public selectedMailGroup: Grupocorreo[] = [];

  public title: string;


  public status: string;
  //Lista de correos
  public listEmail: string[] = [];
  public selectEmail = '';
  public emailRequired = false;
  public emailValid = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _grupocorreoService: GrupocorreoService

  ) {
    this.title = 'Registro resolucion prueba';
    this.grupocorreo = new Grupocorreo(0, '', '', this.user['id'],'', '');

  }

  ngOnInit() {
    console.log('componente de registro cargado...');
    console.log('dni', localStorage.getItem('dniUsuario'));
  }


  registrar(form) {

    if (form.valid === true) {



      this._grupocorreoService.registrarGrupocorreo(this.grupocorreo, this.listEmail).subscribe(
        response => {
          this.spin = true;
          if (response) {
            console.log(response)
            this.spin = false;
            this.status = 'success';
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso'
              
            })
            form.reset();
            this.resetEmail();
          } else {
            this.spin = false;
            this.status = 'error';
          }
        }, error => {
          console.log(<any>error);
        },
      );


    }
    else {
      this.spin = false;
      
      Swal.fire({
        type: 'error',
        title: 'Falta completar datos'
      })
      
    }
  }

  resetEmail(){
    this.listEmail = [];
    this.selectedMailGroup = [];
  }

  agregarCorreo(emailInput) {
    console.log(emailInput)
    if (emailInput.errors) {
      if (emailInput.errors.email) {
        this.emailValid = true;
        this.emailRequired = false;
      }
      if (emailInput.errors.required) {
        this.emailValid = false;
        this.emailRequired = true;
      }
    } else {
      this.emailValid = false;
      this.emailRequired = false;
      this.listEmail.push(emailInput.value);
      this.selectEmail = '';
    }



  }

    deleteEmail(element) {
      let indexEmail;

      indexEmail = this.listEmail.findIndex(email => email === element);
      this.listEmail.splice(indexEmail, 1);
    }



    clean(form) {

      form.reset();
    }


  }
