import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoberturaService } from '../../service/cobertura-service';
import { SnackBarService } from '../../service/snack-bar-service';
interface Cobertura {
  nombre: string;
  sumaAsegurada: number;
  gastoEmision: number;
  comisionVenta: number;
  primaNeta: number;
}
@Component({
  selector: 'app-emisor-cobertura-component',
  standalone: false,
  templateUrl: './emisor-cobertura-component.html',
  styleUrl: './emisor-cobertura-component.css'
})
export class EmisorCoberturaComponent {
  private readonly coberturaServicio: CoberturaService;
  form: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    sumaAsegurada: new FormControl('', Validators.required),
    gastoEmision: new FormControl('', Validators.required),
    comisionVenta: new FormControl('', Validators.required),
    primaNeta: new FormControl('', Validators.required)
  });

  isLoading: boolean = true;

constructor( coberturaServicio: CoberturaService, private readonly snackBar: SnackBarService) {
  setTimeout(() => {
        this.isLoading = false;
      }, 1500);
  this.coberturaServicio = coberturaServicio;
}

  async guardarCobertura() {
    if (this.form.valid) {
      const cobertura: Cobertura = this.form.value; 

      this.isLoading = true;
      this.coberturaServicio.guardarCobertura(cobertura).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.snackBar.openSnackBar('Cobertura creada exitosamente', 'Cerrar');
          this.form.reset(); 
        },
        error: (error) => {
        
          this.isLoading = false;
             this.snackBar.openSnackBar('Error al crear cobertura', 'Cerrar');
        }
      });
    } else {
      this.form.markAllAsTouched(); 
    }
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
}
