import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CoberturaService } from '../../service/cobertura-service';
import { CookieService } from 'ngx-cookie-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component';
import { lastValueFrom } from 'rxjs';
import { SnackBarService } from '../../service/snack-bar-service';

@Component({
  selector: 'app-mantenimiento-coberturas-component',
  standalone: false,
  templateUrl: './mantenimiento-coberturas-component.html',
  styleUrl: './mantenimiento-coberturas-component.css'
})
export class MantenimientoCoberturasComponent implements OnInit, AfterViewInit {
  coberturas: any = [];
  isLoading: boolean = true;


  constructor(private readonly coberturasService: CoberturaService,
    private readonly cookies: CookieService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackBarService
  ) {
    setTimeout(() => {

      this.isLoading = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.buscarCoberturas();
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

  buscarCoberturas() {
    this.isLoading = true;
    this.coberturasService.buscarCoberturas().subscribe(data => {
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

  async actualizarCobertura(u: any) {


    const confirm = await this.openConfirmDialog();

      if (!confirm) {
        return;
      }

 
    u.estado = u.estado === 'Activa' ? 'Inactiva' : 'Activa';

    this.isLoading = true;


    this.coberturasService.guardarCobertura(u).subscribe({
      next: (data) => {
        this.snackBar.openSnackBar(data.response, 'Cerrar');
        this.actualizarTablaCobertura(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.isLoading = false;
      }
    });

  }


  actualizarTablaCobertura(data: any) {
    if (data) {
      this.buscarCoberturas();

    }
  }

   async openConfirmDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Guardado',
        message: '¿Estás seguro de que quieres actualizar el estado de la cobertura?'
      }
    });
    return await lastValueFrom(dialogRef.afterClosed());
  }


}

