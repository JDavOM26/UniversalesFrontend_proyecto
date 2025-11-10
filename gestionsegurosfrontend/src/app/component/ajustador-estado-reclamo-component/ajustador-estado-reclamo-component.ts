import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReclamoService } from '../../service/reclamo-service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ajustador-estado-reclamo-component',
  standalone: false,
  templateUrl: './ajustador-estado-reclamo-component.html',
  styleUrl: './ajustador-estado-reclamo-component.css'
})
export class AjustadorEstadoReclamoComponent implements OnInit, AfterViewInit {
    reclamos: any = [];
     isLoading: boolean = true; 
     
  
  constructor(private readonly reclamoServicio: ReclamoService,
    private readonly cookies: CookieService
  ) { 
     setTimeout(() => {
        this.isLoading = false;
      }, 1500);
  }

  ngOnInit():void{
    this.buscarReclamos();
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

    buscarReclamos() {
      this.isLoading = true;
   const idUsuario = Number(this.cookies.get('idUsuario'));
    this.reclamoServicio.buscarReclamoAjustador(idUsuario).subscribe(data => {
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
  'ajustador',
  'perito',
  'monto-aprobado',
  'observacion',
  'fecha-siniestro',
  'fecha-ingreso-reclamo',
  'fecha-decision-perito',
    'estado-reclamo'
];

}
