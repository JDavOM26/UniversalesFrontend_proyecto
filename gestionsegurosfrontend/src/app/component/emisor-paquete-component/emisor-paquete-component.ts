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

  coberturas: any[] = [];
  selectedCoberturas: any[] = [];
  filteredOptions!: Observable<any[]>;
  myControl = new FormControl('');
  isLoading: boolean = true;

  form: FormGroup = this._formBuilder.group({
    nombre: new FormControl('', Validators.required),
    idCobertura: new FormControl([], Validators.required), 
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
    return cobertura && cobertura.nombre ? cobertura.nombre : '';
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
  }

  async guardarPaquete() {
    if (this.form.valid) {
      const paquete: Paquete = this.form.value;
      this.isLoading = true;
      this.paqueteServicio.guardarPaquete(paquete).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.snackBar.openSnackBar('Paquete guardado exitosamente', 'Cerrar');
          this.submitEM.emit(paquete);
          this.form.reset();
          this.form.get('idCobertura')?.setValue([]); 
          this.selectedCoberturas = []; 
          this.myControl.reset();
        },
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
}