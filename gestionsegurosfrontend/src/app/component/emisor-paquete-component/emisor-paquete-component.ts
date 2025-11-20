import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaqueteService } from '../../service/paquete-service';
import { CoberturaService } from '../../service/cobertura-service';
import { SnackBarService } from '../../service/snack-bar-service';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

interface Paquete {
  nombre: string;
  idCobertura: number[];
  gastoEmision: number;
  comisionVenta: number;
  primaNeta: number;
  primaTotalSinIva: number;
  primaTotalConIva: number;
}

interface Cobertura {
  idCobertura: number;
  nombre: string;
  gastoEmision: number;
  comisionVenta: number;
  primaNeta: number;
  primaTotalSinIva: number;
  primaTotalConIva: number;
}

@Component({
  selector: 'app-emisor-paquete-component',
  standalone: false,
  templateUrl: './emisor-paquete-component.html',
  styleUrl: './emisor-paquete-component.css'
})
export class EmisorPaqueteComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly paqueteServicio = inject(PaqueteService);
  private readonly coberturaService = inject(CoberturaService);
  private readonly snackBar = inject(SnackBarService);

  coberturas: Cobertura[] = [];
  selectedCoberturas: Cobertura[] = [];
  filteredOptions!: Observable<Cobertura[]>;
  myControl = new FormControl('');
  isLoading: boolean = true;


  form: FormGroup = this._formBuilder.group({
    nombre: new FormControl('', Validators.required),
    idCobertura: new FormControl([], Validators.required),
    gastoEmision: new FormControl({ value: 0, disabled: true }, Validators.required),
    comisionVenta: new FormControl({ value: 0, disabled: true }, Validators.required),
    primaNeta: new FormControl({ value: 0, disabled: true }, Validators.required),
    primaTotalSinIva: new FormControl({ value: 0, disabled: true }, Validators.required),
    primaTotalConIva: new FormControl({ value: 0, disabled: true }, Validators.required)
  });

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter<Paquete>();

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.buscarCoberturas();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.form.valueChanges.subscribe(() => this.calcularPrimas());
    this.form.get('idCobertura')?.valueChanges.subscribe(() => this.calcularPrimas());
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.coberturas.filter(option =>
      option.nombre.toLowerCase().includes(filterValue) &&
      !this.selectedCoberturas.some(selected => selected.idCobertura === option.idCobertura)
    );
  }

  buscarCoberturas() {
    this.coberturaService.buscarCoberturas().subscribe({
      next: (data) => {
        this.coberturas = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      },
      error: (error) => {
        console.error('Error fetching coverages:', error);
        this.snackBar.openSnackBar('Error al cargar las coberturas', 'Cerrar');
      }
    });
  }

  displayFn(cobertura: any): string {
    return cobertura?.nombre ? cobertura.nombre : '';
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedCobertura = this.coberturas.find(c => c.idCobertura === event.option.value);
    if (selectedCobertura) {
      this.selectedCoberturas.push(selectedCobertura);
      const currentIds = this.form.get('idCobertura')?.value || [];
      this.form.get('idCobertura')?.setValue([...currentIds, selectedCobertura.idCobertura]);
      this.myControl.reset();
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
      this.calcularPrimas();
    }
  }

  removeCobertura(cobertura: any) {
    this.selectedCoberturas = this.selectedCoberturas.filter(c => c.idCobertura !== cobertura.idCobertura);
    const currentIds = this.form.get('idCobertura')?.value || [];
    this.form.get('idCobertura')?.setValue(currentIds.filter((id: number) => id !== cobertura.idCobertura));
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.calcularPrimas();
  }

  async guardarPaquete() {
    if (this.form.valid) {
      const paquete: Paquete = this.form.getRawValue();
      this.isLoading = true;
      this.paqueteServicio.guardarPaquete(paquete).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.snackBar.openSnackBar(data.response, 'Cerrar');
          this.submitEM.emit(paquete);
          this.form.reset();
          this.form.get('idCobertura')?.setValue([]);
          this.selectedCoberturas = [];
          this.myControl.reset();

          this.form.patchValue({
            primaTotalSinIva: 0,
            primaTotalConIva: 0
          });},
        error: (error) => {
          console.error('Error al guardar:', error);
          this.isLoading = false;
          this.snackBar.openSnackBar('Error al guardar el paquete', 'Cerrar');
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.snackBar.openSnackBar('Por favor completa todos los campos requeridos', 'Cerrar');
    }
  }

  private calcularPrimas(): void {




    const totalGastoEmisionCoberturas = this.selectedCoberturas.reduce(
      (sum, cobertura) => sum + (Number(cobertura.gastoEmision) || 0),
      0
    );
    const totalComisionVentaCoberturas = this.selectedCoberturas.reduce(
      (sum, cobertura) => sum + (Number(cobertura.comisionVenta) || 0),
      0
    );
    const totalPrimaNetaCoberturas = this.selectedCoberturas.reduce(
      (sum, cobertura) => sum + (Number(cobertura.primaNeta) || 0),
      0
    );

    const primaTotalSinIva = Number(
      this.selectedCoberturas
        .reduce((sum, cobertura) => sum + (Number(cobertura.primaTotalSinIva) || 0), 0)
        .toFixed(2)
    );
    const primaTotalConIva = Number(
      this.selectedCoberturas
        .reduce((sum, cobertura) => sum + (Number(cobertura.primaTotalConIva) || 0), 0)
        .toFixed(2)
    );

    this.form.patchValue({
      gastoEmision: totalGastoEmisionCoberturas,
      comisionVenta: totalComisionVentaCoberturas,
      primaNeta: totalPrimaNetaCoberturas,
      primaTotalSinIva: primaTotalSinIva,
      primaTotalConIva: primaTotalConIva
    }, { emitEvent: false });
  }
}
