import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {ProfileComponent} from './views/profile/profile.component';

// import { InicioSesionComponent } from './views/inicioSesion/inicioSesion.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [

  { path: 'Home', redirectTo: 'dashboard', pathMatch: 'full' },
  //redirectTo: 'inicioSesion',
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: '404', component: P404Component, data: { title: 'Page 404' } },
  { path: '500', component: P500Component, data: { title: 'Page 500' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  

  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      { path: 'perfil', component: ProfileComponent, data: { title: 'Perfil de usuario' } },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'registrar',
        loadChildren: './views/registrar/registrar.module#RegistrarModule'
      },
      {
        path: 'bandeja',
        loadChildren: './views/bandeja/bandeja.module#BandejaModule'
      },
      {
        path: 'trabajadas',
        loadChildren: './views/trabajadas/rtrabajadas.module#RtrabajadasModule'
      },
      {
        path: 'resoluciones',
        loadChildren: './views/resoluciones/resoluciones.module#ResolucionesModule'
      }
      ,
      {
        path: 'nuevoCorreo',
        loadChildren: './views/nuevocorreo/nuevocorreo.module#NuevoCorreoModule'
      }
      ,
      {
        path: 'grupoCorreo',
        loadChildren: './views/grupocorreo/grupocorreo.module#GrupocorreoModule'
      },
      {
        path: 'correo/:num_resolucion',
        loadChildren: './views/correo/correo.module#CorreoModule'
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
