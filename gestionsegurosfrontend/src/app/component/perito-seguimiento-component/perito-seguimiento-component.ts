import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReclamoService } from '../../service/reclamo-service';
import { CookieService } from 'ngx-cookie-service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AprobarReclamoComponent } from '../aprobar-reclamo-component/aprobar-reclamo-component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../service/snack-bar-service';
import { RechazarReclamoComponent } from '../rechazar-reclamo-component/rechazar-reclamo-component';

interface ReclamoAprobado {
  idReclamo: number;
  idCobertura: number;
  idPoliza: number;
  perito: number;
  montoAprobado: number;
}

interface ReclamoRechazado {
  idReclamo: number;
   perito: number;
  observacion: string;
}

@Component({
  selector: 'app-perito-seguimiento-component',
  standalone: false,
  templateUrl: './perito-seguimiento-component.html',
  styleUrl: './perito-seguimiento-component.css'
})
export class PeritoSeguimientoComponent implements OnInit, AfterViewInit {

 reclamos: any = [];
     isLoading: boolean = true; 
     
  
  constructor(private readonly reclamoServicio: ReclamoService,
    private readonly cookies: CookieService,
    private readonly dialog: MatDialog,
   private readonly snackBar: SnackBarService
  ) { 
     setTimeout(() => {
        this.isLoading = false;
      }, 1500);
  }

  ngOnInit():void{
    this.buscarReclamosIngresados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator1;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 
    buscarReclamosIngresados() {
      this.isLoading = true;

    this.reclamoServicio.buscarReclamosIngresados().subscribe(data => {
      this.reclamos = data.map((item: any) => ({
        ...item,
      }));
      
      this.dataSource.data = this.reclamos;
      this.isLoading = false;
    });
  }


  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>([]);
  filterValue: string = '';

  displayedColumns: string[] = [
  'id-reclamo',
  'id-cobertura',
  'id-poliza',
  'estado-reclamo',
  'ajustador',
  'fecha-siniestro',
  'fecha-ingreso-reclamo',
  'acciones'
];


  aprobarReclamo(u: any): void {
     
      const dialogRef = this.dialog.open(AprobarReclamoComponent, {
        width: '400px',
        maxWidth: '95vw',
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idUsuario = +this.cookies.get('idUsuario');;
          console.log('Resultado del diálogo:', result);
  
          this.aprobarReclamoApi({
            idReclamo: u.idReclamo, 
            perito: idUsuario,
             montoAprobado: result.montoAprobado,
             idCobertura: u.idCobertura,
             idPoliza: u.idPoliza
          });
        }
      });
    }

      aprobarReclamoApi(reclamo: ReclamoAprobado) {
    this.isLoading = true;
    this.reclamoServicio.aprobarReclamo(reclamo).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.snackBar.openSnackBar('Reclamo aprobado exitosamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.isLoading = false;
        this.snackBar.openSnackBar('Error al aprobar el reclamo', 'Cerrar');
      }
    });
  }

  rechazarReclamo(u: any): void {
     
      const dialogRef = this.dialog.open(RechazarReclamoComponent, {
        width: '400px',
        maxWidth: '95vw',
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idUsuario = +this.cookies.get('idUsuario');;
          console.log('Resultado del diálogo:', result);
  
          this.rechazarReclamoApi({
            idReclamo: u.idReclamo,
            perito: idUsuario,
             observacion: result.observacion,
               
          });
        }
      });
    }

     rechazarReclamoApi(reclamo: ReclamoRechazado) {
    this.isLoading = true;
    this.reclamoServicio.rechazarReclamo(reclamo).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.snackBar.openSnackBar('Reclamo rechazado exitosamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.isLoading = false;
        this.snackBar.openSnackBar('Error al rechazar el reclamo', 'Cerrar');
      }
    });
  }
}
