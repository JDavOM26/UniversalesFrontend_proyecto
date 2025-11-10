import {ErrorHandler,  NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 



import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from '../interceptors/auth';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginComponent } from './component/login-component/login-component';
import { AdminDashboardComponent } from './component/admin-dashboard-component/admin-dashboard-component';
import { AdminEmpleadoComponent } from './component/admin-empleado-component/admin-empleado-component';
import { EmisorCoberturaComponent } from './component/emisor-cobertura-component/emisor-cobertura-component';
import { EmisorPaqueteComponent } from './component/emisor-paquete-component/emisor-paquete-component';
import { AjustadorReclamoComponent } from './component/ajustador-reclamo-component/ajustador-reclamo-component';
import { PeritoSeguimientoComponent } from './component/perito-seguimiento-component/perito-seguimiento-component';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { NavbarComponent } from './component/navbar-component/navbar-component';
import { EmisorPolizaComponent } from './component/emisor-poliza-component/emisor-poliza-component';
import { ConfirmDialogComponent } from './component/confirm-dialog-component/confirm-dialog-component'; 

import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';


import { AjustadorEstadoReclamoComponent } from './component/ajustador-estado-reclamo-component/ajustador-estado-reclamo-component';
import { ProgressSpinnerComponent } from './component/progress-spinner-component/progress-spinner-component';
import { ReclamoDialogComponent } from './component/reclamo-dialog-component/reclamo-dialog-component';
import { AprobarReclamoComponent } from './component/aprobar-reclamo-component/aprobar-reclamo-component';
import { RechazarReclamoComponent } from './component/rechazar-reclamo-component/rechazar-reclamo-component';
import { MantenimientoCoberturasComponent } from './component/mantenimiento-coberturas-component/mantenimiento-coberturas-component';
import { MantenimientoPaquetesComponent } from './component/mantenimiento-paquetes-component/mantenimiento-paquetes-component';
import { ListaPolizasComponent } from './component/lista-polizas-component/lista-polizas-component';


@NgModule({
  declarations: [
    App,
    LoginComponent,
    AdminDashboardComponent,
    AdminEmpleadoComponent,
    EmisorCoberturaComponent,
    EmisorPaqueteComponent,
    AjustadorReclamoComponent,
    PeritoSeguimientoComponent,
    NavbarComponent,
    EmisorPolizaComponent,
    AjustadorEstadoReclamoComponent,
    ProgressSpinnerComponent,
    ReclamoDialogComponent,
    AprobarReclamoComponent,
    RechazarReclamoComponent,
    MantenimientoCoberturasComponent,
    MantenimientoPaquetesComponent,
    ListaPolizasComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
     MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],

  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    CookieService,
    { provide: ErrorHandler },
 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [App]
})
export class AppModule { }
