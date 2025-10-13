import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rechazar-reclamo-component',
  standalone: false,
  templateUrl: './rechazar-reclamo-component.html',
  styleUrl: './rechazar-reclamo-component.css'
})
export class RechazarReclamoComponent {

  form: FormGroup;
  myControl = new FormControl('');
  constructor(
     public dialogRef: MatDialogRef<RechazarReclamoComponent>
  ){
    this.form = new FormGroup({
      observacion: new FormControl('', Validators.required), 
    })
  }

  
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = {
        observacion: this.form.get('observacion')?.value,
      
      };
      
      console.log('Formulario a enviar:', formValue);
      this.dialogRef.close(formValue);
    } else {
      console.log('Formulario inválido:', this.form.value);
      this.form.markAllAsTouched();
    }
  }
}

