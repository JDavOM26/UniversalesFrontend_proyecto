import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login-component/login-component';
import {AdminDashboardComponent} from './component/admin-dashboard-component/admin-dashboard-component';
import {AdminEmpleadoComponent} from './component/admin-empleado-component/admin-empleado-component';
import {EmisorCoberturaComponent} from './component/emisor-cobertura-component/emisor-cobertura-component';
import {EmisorPaqueteComponent} from './component/emisor-paquete-component/emisor-paquete-component';
import {EmisorPolizaComponent} from './component/emisor-poliza-component/emisor-poliza-component';
import {PeritoSeguimientoComponent} from './component/perito-seguimiento-component/perito-seguimiento-component';
import {AjustadorReclamoComponent} from './component/ajustador-reclamo-component/ajustador-reclamo-component';
import {
  AjustadorEstadoReclamoComponent
} from './component/ajustador-estado-reclamo-component/ajustador-estado-reclamo-component';
import {ProgressSpinnerComponent} from './component/progress-spinner-component/progress-spinner-component';
import {
  MantenimientoCoberturasComponent
} from './component/mantenimiento-coberturas-component/mantenimiento-coberturas-component';
import {
  MantenimientoPaquetesComponent
} from './component/mantenimiento-paquetes-component/mantenimiento-paquetes-component';
import {ListaPolizasComponent} from './component/lista-polizas-component/lista-polizas-component';
import {MiPerfil} from './component/mi-perfil/mi-perfil';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: AdminDashboardComponent},
  {path: 'empleados', component: AdminEmpleadoComponent},
  {path: 'coberturas', component: EmisorCoberturaComponent},
  {path: 'paquetes', component: EmisorPaqueteComponent},
  {path: 'polizas', component: EmisorPolizaComponent},
  {path: 'seguimiento-reclamo', component: PeritoSeguimientoComponent},
  {path: 'ajustador-reclamo', component: AjustadorReclamoComponent},
  {path: 'ajustador-estado-reclamo', component: AjustadorEstadoReclamoComponent},
  {path: 'mantenimiento-coberturas', component: MantenimientoCoberturasComponent},
  {path: 'mantenimiento-paquetes', component: MantenimientoPaquetesComponent},
  {path: 'ver-polizas', component: ListaPolizasComponent},
  {path: 'spinner', component: ProgressSpinnerComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'mi-perfil', component: MiPerfil},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
