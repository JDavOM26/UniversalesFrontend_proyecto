import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PolizaCoberturaService } from '../../service/poliza-cobertura-service';

interface DialogData {
  idPoliza: number;
  idCobertura: number;
}
@Component({
  selector: 'app-aprobar-reclamo-component',
  standalone: false,
  templateUrl: './aprobar-reclamo-component.html',
  styleUrl: './aprobar-reclamo-component.css'
})
export class AprobarReclamoComponent {
   sumaAseguradaDisponible: number | null = null;
   form: FormGroup;
  myControl = new FormControl('');
 constructor(
    public dialogRef: MatDialogRef<AprobarReclamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private readonly polizaCoberturaService: PolizaCoberturaService
  ) {
    this.form = new FormGroup({
      montoAprobado: new FormControl('', [Validators.required, Validators.min(0)]),
    });
 
    this.buscarSumaAsegurada();
  }

  
  onCancel(): void {
    this.dialogRef.close();
  }

onSubmit(): void {
    if (this.form.valid) {
      const formValue = {
        montoAprobado: this.form.get('montoAprobado')?.value,
      };
      if (this.sumaAseguradaDisponible !== null && formValue.montoAprobado > this.sumaAseguradaDisponible) {
        this.form.get('montoAprobado')?.setErrors({ max: true });
        return;
      }

      this.dialogRef.close(formValue);
    } else {
     
      this.form.markAllAsTouched();
    }
  }


    buscarSumaAsegurada() {
      this.polizaCoberturaService.obtenerSumaAseguradaDisponible(this.data.idPoliza, this.data.idCobertura).subscribe({
        next: (data) => {
          this.sumaAseguradaDisponible = data;
        },
        error: (error) => {
          console.error('Error obteniendo suma asegurada:', error);
        }
      });
    }
}
