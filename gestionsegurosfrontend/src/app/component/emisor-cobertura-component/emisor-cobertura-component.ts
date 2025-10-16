import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoberturaService } from '../../service/cobertura-service';
import { SnackBarService } from '../../service/snack-bar-service';
interface Cobertura {
  nombre: string;
  sumaAsegurada: number;
  gastoEmision: number;
  comisionVenta: number;
  primaNeta: number;
  primaTotalSinIva: number;
  primaTotalConIva: number;
}
@Component({
  selector: 'app-emisor-cobertura-component',
  standalone: false,
  templateUrl: './emisor-cobertura-component.html',
  styleUrl: './emisor-cobertura-component.css'
})
export class EmisorCoberturaComponent implements OnInit {

  primaTotalSinIvaCalc: number = 0;
  primaTotalConIvaCalc: number = 0;

  private readonly coberturaServicio: CoberturaService;
  form: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    sumaAsegurada: new FormControl('', Validators.required),
    gastoEmision: new FormControl('', Validators.required),
    comisionVenta: new FormControl('', Validators.required),
    primaNeta: new FormControl('', Validators.required),
    primaTotalSinIva: new FormControl({ value: 0, disabled: true }, Validators.required),
    primaTotalConIva: new FormControl({ value: 0, disabled: true }, Validators.required)

  });

  isLoading: boolean = true;

  constructor(coberturaServicio: CoberturaService, private readonly snackBar: SnackBarService) {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    this.coberturaServicio = coberturaServicio;
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => {
      this.calcularPrimas();
    });
  }

  async guardarCobertura() {
    if (this.form.valid) {
     const cobertura: Cobertura = {
        ...this.form.getRawValue(),
        primaTotalSinIva: this.primaTotalSinIvaCalc,
        primaTotalConIva: this.primaTotalConIvaCalc
      };

      this.isLoading = true;
      this.coberturaServicio.guardarCobertura(cobertura).subscribe({
       next: (data) => {
          this.isLoading = false;
          this.snackBar.openSnackBar('Cobertura creada exitosamente', 'Cerrar');
          this.form.reset();
          this.primaTotalSinIvaCalc = 0;
          this.primaTotalConIvaCalc = 0;
          this.form.patchValue({
            primaTotalSinIva: 0,
            primaTotalConIva: 0
          });
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

  private calcularPrimas(): void {
    const valores = this.form.value;
    const gastoEmision = Number(valores.gastoEmision) || 0;
    const comisionVenta = Number(valores.comisionVenta) || 0;
    const primaNeta = Number(valores.primaNeta) || 0;

   this.primaTotalSinIvaCalc = Number((primaNeta + gastoEmision + comisionVenta).toFixed(2));
    this.primaTotalConIvaCalc = Number((this.primaTotalSinIvaCalc * 1.12).toFixed(2));

    this.form.patchValue({
      primaTotalSinIva: this.primaTotalSinIvaCalc,
      primaTotalConIva: this.primaTotalConIvaCalc
    }, { emitEvent: false }); 
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
}
