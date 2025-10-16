import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReclamoService } from '../../service/reclamo-service';
import { PolizaService } from '../../service/poliza-service';
import { SnackBarService } from '../../service/snack-bar-service';
import { ReclamoDialogComponent } from '../reclamo-dialog-component/reclamo-dialog-component';
import { CoberturaService } from '../../service/cobertura-service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface Reclamo {
  idCobertura: number;
  idPoliza: number;
  fechaSiniestro: Date;
  fechaIngresoReclamo: Date;
  primerNombre: string;
  segundoNombre: string;
  tercerNombre: string;
  apellidoPrimero: string;
  apellidoSegundo: string;
  apellidoTercero: string;
  ajustador: number;
}

interface Poliza {
  idPoliza: number;
  idContratante: number;
  nombrePoliza: string;
  estado: string;
  vendedor: number;
  idPaquete: number;
  fechaCreacion: string;
  fechaVencimiento: string;
  nombreContratante?: string;
  beneficiarios?: any[];
}

@Component({
  selector: 'app-ajustador-reclamo-component',
  standalone: false,
  templateUrl: './ajustador-reclamo-component.html',
  styleUrl: './ajustador-reclamo-component.css'
})
export class AjustadorReclamoComponent {
  isLoading: boolean = true;
  filtroSeleccionado: string = '';
  valorBusqueda: string = '';
  polizas: Poliza[] = [];
  idPolizaTemp: number = 0;
  coberturas: any[] = [];
  filteredOptions!: Observable<any[]>;
  myControl = new FormControl('');
  sumaDisponible: number = 0;

  form: FormGroup = new FormGroup({
    idCobertura: new FormControl('', Validators.required),
    fechaSiniestro: new FormControl('', Validators.required),
    primerNombre: new FormControl('', Validators.required),
    segundoNombre: new FormControl(''),
    tercerNombre: new FormControl(''),
    apellidoPrimero: new FormControl('', Validators.required),
    apellidoSegundo: new FormControl('')
  });

  constructor(
    private readonly reclamoServicio: ReclamoService,
    private readonly polizaService: PolizaService,
    private readonly snackBar: SnackBarService,
    private readonly dialog: MatDialog,
    private readonly coberturaService: CoberturaService,
    private readonly cookies: CookieService
  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }


  buscarPoliza() {
    if (!this.valorBusqueda) {
      this.snackBar.openSnackBar('Por favor, ingrese un valor', 'Cerrar');
      return;
    }

    this.isLoading = true;
    this.polizaService.buscarPoliza(this.valorBusqueda).subscribe({
      next: (data) => {
        this.polizas = data;
        this.isLoading = false;
        if (data.length === 0) {
          this.snackBar.openSnackBar('No se encontraron pólizas', 'Cerrar');
        }
      },
      error: (error) => {
        console.error('Error fetching polizas:', error);
        this.polizas = [];
        this.isLoading = false;
        this.snackBar.openSnackBar('Error al cargar las pólizas', 'Cerrar');
      }
    });
  }

  openDialog(poliza: Poliza): void {
    this.idPolizaTemp = poliza.idPoliza;
    const dialogRef = this.dialog.open(ReclamoDialogComponent, {
      width: '950px',
      maxWidth: '95vw',
      autoFocus: false,
      data: { poliza }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idUsuario = +this.cookies.get('idUsuario');;
        this.sumaDisponible = result.sumaDisponible;
        this.guardarReclamo({
          idCobertura: result.idCobertura,
          idPoliza: poliza.idPoliza,
          fechaSiniestro: result.fechaSiniestro,
          fechaIngresoReclamo: result.fechaIngresoReclamo || new Date(),
          primerNombre: result.primerNombre || '',
          segundoNombre: result.segundoNombre || '',
          tercerNombre: result.tercerNombre || '',
          apellidoPrimero: result.apellidoPrimero || '',
          apellidoSegundo: result.apellidoSegundo || '',
          apellidoTercero: result.apellidoTercero || '',
          ajustador: idUsuario
        });
      }
    });
  }

  guardarReclamo(reclamo: Reclamo) {
    this.isLoading = true;
    if(this.sumaDisponible<=0){
       this.isLoading = false;
       this.snackBar.openSnackBar('No hay suma asegurada disponible', 'Cerrar');
       return;
    }
    this.reclamoServicio.guardarReclamo(reclamo).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.snackBar.openSnackBar('Reclamo guardado exitosamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.isLoading = false;
        this.snackBar.openSnackBar('Error al guardar el reclamo', 'Cerrar');
      }
    });
  }

  trackById(index: number, poliza: Poliza): number {
    return poliza.idPoliza;
  }



  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
}