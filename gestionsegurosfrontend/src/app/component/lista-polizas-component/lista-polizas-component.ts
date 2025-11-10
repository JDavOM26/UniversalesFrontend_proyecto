import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PolizaService } from '../../service/poliza-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-polizas-component',
  standalone: false,
  templateUrl: './lista-polizas-component.html',
  styleUrl: './lista-polizas-component.css'
})
export class ListaPolizasComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  polizas: any = [];

  @ViewChild('paginator2') paginator2!: MatPaginator;
  dataSourcePaginado = new MatTableDataSource<any>([]);
  totalElements: number = 0;
    filterValue: string = '';

  constructor(private readonly polizaService: PolizaService) { }


  ngAfterViewInit() {


    if (this.paginator2) {
      this.paginator2.page.subscribe(() => this.buscarPolizasPaginado());
    }
  }

  ngOnInit(): void {

    this.buscarPolizasPaginado();
  }

  buscarPolizasPaginado() {
    this.isLoading = true;
    const page = this.paginator2 ? this.paginator2.pageIndex : 0;
    const size = this.paginator2 ? this.paginator2.pageSize : 5;

    this.polizaService.buscarPolizaPaginado(page, size).subscribe({
      next: (data: any) => {
        const personasPaginadas = data.content.map((item: any) => ({
          ...item,
          edad: +item.edad,
        }));


        this.dataSourcePaginado.data = personasPaginadas;
        this.totalElements = data.totalElements;


        if (this.paginator2) {
          this.paginator2.length = this.totalElements;
          this.paginator2.pageIndex = data.number;
          this.paginator2.pageSize = data.size;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error buscando personas:', err);
        this.isLoading = false;
      }
    });
  }

displayedColumns: string[] = [
    'idPoliza',
    'nombrePoliza',
    'estado',
    'contratante',
    'vendedor',
    'primaVendidaTotal',
    'idPaquete',
    'fechaCreacion',
    'fechaVencimiento'
  ];

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePaginado.filter = filterValue.trim().toLowerCase();
  }

}
