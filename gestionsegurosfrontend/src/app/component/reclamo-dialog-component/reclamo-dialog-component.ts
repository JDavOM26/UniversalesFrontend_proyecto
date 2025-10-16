import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CoberturaService } from '../../service/cobertura-service';

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
}

interface Cobertura {
  ID_COBERTURA: number;
  NOMBRE: string;
  SUMA_ASEGURADA_DISPONIBLE: number;
}

@Component({
  selector: 'app-reclamo-dialog-component',
  standalone: false,
  templateUrl: './reclamo-dialog-component.html',
  styleUrl: './reclamo-dialog-component.css'
})
export class ReclamoDialogComponent {
  form: FormGroup;
  coberturaControl = new FormControl('', Validators.required);
  filteredCoberturas: Observable<Cobertura[]>;
  coberturas: Cobertura[] = [];
  selectedSumaDisponible: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<ReclamoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { poliza: Poliza },
    private readonly coberturaService: CoberturaService
  ) {
    this.form = new FormGroup({
      idCobertura: new FormControl('', Validators.required), 
      fechaSiniestro: new FormControl('', Validators.required),
      sumaDisponible: new FormControl({ value: '', disabled: true }),
      primerNombre: new FormControl('', Validators.required),
      segundoNombre: new FormControl(''),
      tercerNombre: new FormControl(''),
      apellidoPrimero: new FormControl('', Validators.required),
      apellidoSegundo: new FormControl(''),
      apellidoTercero: new FormControl('')
    });

    this.buscarCoberturaPorPoliza();

    this.filteredCoberturas = this.coberturaControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCoberturas(value || ''))
    );
  }

  private _filterCoberturas(value: string | number): Cobertura[] {
    if (typeof value === 'number') {
      return this.coberturas;
    }
    
    const filterValue = value.toLowerCase();
    return this.coberturas.filter(cobertura =>
      cobertura.NOMBRE.toLowerCase().includes(filterValue)
    );
  }

  displayFn = (id: number): string => {
    if (!id) return '';
    const cobertura = this.coberturas.find(c => c.ID_COBERTURA === id);
    return cobertura ? cobertura.NOMBRE : '';
  }

  onOptionSelected(event: any) {
    const selectedId = event.option.value;
    const selectedCobertura = this.coberturas.find(c => c.ID_COBERTURA === selectedId);
    
    if (selectedCobertura) {
      this.form.patchValue({
        idCobertura: selectedCobertura.ID_COBERTURA,
        sumaDisponible: selectedCobertura.SUMA_ASEGURADA_DISPONIBLE
      });
      this.selectedSumaDisponible = selectedCobertura.SUMA_ASEGURADA_DISPONIBLE;
    }
  }

  buscarCoberturaPorPoliza() {
    this.coberturaService.buscarCoberturaPorPoliza(this.data.poliza.idPoliza).subscribe({
      next: (data) => {
        this.coberturas = data;
        this.filteredCoberturas = this.coberturaControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCoberturas(value || ''))
        );
      },
      error: (error) => {
        console.error('Error fetching coberturas:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = {
        idCobertura: this.form.get('idCobertura')?.value,
        fechaSiniestro: this.form.get('fechaSiniestro')?.value,
        sumaDisponible: this.selectedSumaDisponible,
        primerNombre: this.form.get('primerNombre')?.value,
        segundoNombre: this.form.get('segundoNombre')?.value,
        tercerNombre: this.form.get('tercerNombre')?.value,
        apellidoPrimero: this.form.get('apellidoPrimero')?.value,
        apellidoSegundo: this.form.get('apellidoSegundo')?.value,
        apellidoTercero: this.form.get('apellidoTercero')?.value,
        fechaIngresoReclamo: new Date().toISOString(),
        ajustador: 0
      };
      
      
      this.dialogRef.close(formValue);
    } else {
     
      this.form.markAllAsTouched();
    }
  }
}