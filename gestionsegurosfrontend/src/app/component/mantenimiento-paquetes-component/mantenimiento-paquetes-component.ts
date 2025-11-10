import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PaqueteService } from '../../service/paquete-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component';
import { lastValueFrom } from 'rxjs';
import { SnackBarService } from '../../service/snack-bar-service';

@Component({
  selector: 'app-mantenimiento-paquetes-component',
  standalone: false,
  templateUrl: './mantenimiento-paquetes-component.html',
  styleUrl: './mantenimiento-paquetes-component.css'
})
export class MantenimientoPaquetesComponent implements OnInit, AfterViewInit {
  coberturas: any = [];
  isLoading: boolean = true;


  constructor(private readonly paquetesService: PaqueteService,
    private readonly cookies: CookieService,
    private readonly dialog: MatDialog,
     private readonly snackBar: SnackBarService

  ) {
    setTimeout(() => {

      this.isLoading = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.buscarPaquetes();
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

  buscarPaquetes() {
    this.isLoading = true;
    this.paquetesService.buscarPaquetes().subscribe(data => {
      this.coberturas = data.map((item: any) => ({
        ...item,
      }));

      this.dataSource.data = this.coberturas;
      this.isLoading = false;
    });
  }


  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>([]);
  filterValue: string = '';

  displayedColumns: string[] = [
    'id-cobertura',
    'nombre',
    'sumaAsegurada',
    'gastoEmision',
    'comisionVenta',
    'primaNeta',
    'primaTotalSinIva',
    'primaTotalConIva',
    'estado',
    'accion'
  ];

  async actualizarPaquete(u: any) {


    const confirm = await this.openConfirmDialog();

      if (!confirm) {
        return;
      }

 
    u.estado = u.estado === 'Activo' ? 'Inactivo' : 'Activo';

    this.isLoading = true;


    this.paquetesService.guardarPaquete(u).subscribe({
      next: (data) => {
        this.snackBar.openSnackBar(data, 'Cerrar');
        this.actualizarTablaPaquete(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.isLoading = false;
      }
    });

  }


  actualizarTablaPaquete(data: any) {
    if (data) {
      this.buscarPaquetes();

    }
  }

    async openConfirmDialog(): Promise<boolean> {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirmar Guardado',
          message: '¿Estás seguro de que quieres actualizar el estado del paquete?'
        }
      });
      return await lastValueFrom(dialogRef.afterClosed());
    }
  

}

