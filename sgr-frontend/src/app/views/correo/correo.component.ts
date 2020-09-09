import { Component, Inject } from '@angular/core';
import { Resolucion } from '../../models/resolucion';
import { Grupocorreo } from '../../models/grupocorreo';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalService } from '../../services';
import { CorreoService } from '../../services/correo.service';
import { GrupocorreoService } from '../../services/grupocorreo.service';
import { Mail } from "../../models/mail";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'correo.component.html',
  providers: [CorreoService, GrupocorreoService],
  styleUrls: ['./correo.component.css'],
})
export class CorreoComponent {
  //resolucion
  private num_resolucion: String;
  spin:boolean= false;

  //usuario
  private user = JSON.parse(localStorage.getItem('usuario'));

  //Opciones de grupo
  public optionGroup: Number;

  //Lista de correos
  public listEmail: string[] = [];
  public selectEmail = '';
  public emailRequired = false;
  public emailValid = false;

  //Grupo de correos
  public groupSelected: Grupocorreo;
  public defaultOptionGroup: Grupocorreo;
  public group: Grupocorreo;
  public mailGroup: Grupocorreo[];
  public selectedMailGroup: Grupocorreo[] = [];



  public correoV: Grupocorreo;
  public correosV: Grupocorreo[];
  public grupocorreo: Grupocorreo;
  primaryModal: any;
  public title: string;
  public grupoCorreos: Grupocorreo[];
  public resolucion: Resolucion;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _correoService: CorreoService,
    private _grupocorreoService: GrupocorreoService
  ) {
    this.num_resolucion = this._route.snapshot.params.num_resolucion;
    this.title = 'correo';
    this.group = new Grupocorreo(0, '', '', this.user['id'], '', '');
    this.groupSelected = new Grupocorreo(0, '', '', this.user['id'], '', '');
    this.correoV = new Grupocorreo(0, '', '', this.user['id'],'', '');
    this.defaultOptionGroup = new Grupocorreo(999, "--seleccione--", '', this.user['id'], '', '');

  }

  ngOnInit() {
    //console.log('componente de registro cargado...', this._route.snapshot.params.num_resolucion);
    this.listartNombreGrupo();
  }




  listartNombreGrupo() {
    // console.log( this.grupocorreo.id_grupo + 'numero tipo resolucion');
    this._grupocorreoService.listartNombreGrupo(this.grupocorreo).subscribe(
      response => {

        // console.log(response);
        this.mailGroup = response.grupo;
        this.mailGroup.unshift(this.defaultOptionGroup);
        //this.group.name_group = this.mailGroup[0].name_group;
        this.optionGroup = this.mailGroup[0].id_group;
        this.changeGroup();
        this.status = 'success';
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  agregarCorreo(emailInput) {
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


  AgregarGrupo() {

    let objectGroup = this.mailGroup.find(group_id => group_id.id_group === this.groupSelected.id_group);

    if (this.selectedMailGroup.find(group => group.id_group === objectGroup.id_group) || objectGroup.id_group === 999) {
      //console.log('El grupo ya esta agregado');
    } else {
      this.selectedMailGroup.push(new Grupocorreo(objectGroup.id_group, objectGroup.name_group, '', this.user['id'], '', ''));
      let index = this.mailGroup.findIndex(group => group.id_group === objectGroup.id_group);
      this.mailGroup.splice(index, 1);
      this.optionGroup = this.mailGroup[0].id_group;
      this.changeGroup();
    }

  }

  changeGroup() {
    this.groupSelected.id_group = this.optionGroup;
  }

  deleteEmail(element) {
    let indexEmail;

    indexEmail = this.listEmail.findIndex(email => email === element);
    this.listEmail.splice(indexEmail, 1);
  }

  deleteGroup(element) {
    let indexGroup;

    indexGroup = this.selectedMailGroup.findIndex(group => group.id_group === element.id_group);
    this.selectedMailGroup.splice(indexGroup, 1);
    this.mailGroup.push(element);
    this.mailGroup.sort(function (a, b) {
      if (a.name_group > b.name_group) {
        return 1;
      }
      if (a.name_group < b.name_group) {
        return -1;
      }
      return 0;
    });
  }

  sendEmail(groups: Grupocorreo[], emails: string[], modal: any) {
    this.spin=true;
    let user =
    this._correoService.sendEmail(groups, emails, this.num_resolucion).subscribe(
      response => {
        console.log("RESPONSE: ", response);
          if( response['response'] === 'success'){
            this.spin=false;
            modal.show();
            this.resetEmail();
          }
      }
    );
    //modal.show();
  }

  resetEmail(){
    this.listEmail = [];
    this.selectedMailGroup = [];
  }

  irInicio() {
    this._router.navigate(['/dashboard']);
  }

}
