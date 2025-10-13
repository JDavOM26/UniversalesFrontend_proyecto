import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-aprobar-reclamo-component',
  standalone: false,
  templateUrl: './aprobar-reclamo-component.html',
  styleUrl: './aprobar-reclamo-component.css'
})
export class AprobarReclamoComponent {
   form: FormGroup;
  myControl = new FormControl('');
  constructor(
     public dialogRef: MatDialogRef<AprobarReclamoComponent>
  ){
    this.form = new FormGroup({
      montoAprobado: new FormControl('', Validators.required), 
    })
  }

  
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = {
        montoAprobado: this.form.get('montoAprobado')?.value,
      
      };
      
      console.log('Formulario a enviar:', formValue);
      this.dialogRef.close(formValue);
    } else {
      console.log('Formulario inválido:', this.form.value);
      this.form.markAllAsTouched();
    }
  }
}
