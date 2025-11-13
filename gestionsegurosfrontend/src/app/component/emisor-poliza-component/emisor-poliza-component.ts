import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PolizaService } from '../../service/poliza-service';
import { CookieService } from 'ngx-cookie-service';
import { SnackBarService } from '../../service/snack-bar-service';
import { ClienteService } from '../../service/cliente-service';
import { map, Observable, startWith } from 'rxjs';
import { PaqueteService } from '../../service/paquete-service';


@Component({
  selector: 'app-emisor-poliza-component',
  standalone: false,
  templateUrl: './emisor-poliza-component.html',
  styleUrl: './emisor-poliza-component.css'
})
export class EmisorPolizaComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  isLoading: boolean = true;
  clienteEstaVacio: boolean = true;
  private readonly polizaServicio: PolizaService;
  secondFormGroups: FormGroup[] = [];
  thirdFormGroups: FormGroup[] = [];
  telefonoFormGroups: FormGroup[] = [];
  correoFormGroups: FormGroup[] = [];
  direccionFormGroups: FormGroup[] = [];
  errorParticipacion: string | null = null;
  cliente: any = null;
  paquetes: any[] = [];
  filteredOptions!: Observable<any[]>;
  myControl = new FormControl('');





  isLinear = false;


  hoy: string = new Date().toLocaleDateString('en-CA');
  fecha = new Date();
  unAnioMenosUnDia: string = '';


  constructor(polizaServicio: PolizaService,
    private readonly cookies: CookieService,
    private readonly snackBar: SnackBarService,
    private readonly clienteService: ClienteService,
    private readonly paqueteService: PaqueteService) {

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    this.polizaServicio = polizaServicio;
    this.addBeneficiaryForm();
    this.addDependienteForm();
    this.addTelefonoForm();
    this.addCorreoForm();
    this.addDireccionForm();


  }

  ngOnInit(): void {
    this.buscarPaquetes();
    const hoyDate = new Date();
    const vencimientoDate = new Date();
    vencimientoDate.setFullYear(hoyDate.getFullYear() + 1);
    vencimientoDate.setDate(hoyDate.getDate() - 1);

    const hoy = hoyDate.toLocaleDateString('en-CA');
    const unAnioMenosUnDia = vencimientoDate.toLocaleDateString('en-CA');

    this.polizaFormGroup.patchValue({
      fechaCreacion: hoy,
      fechaVencimiento: unAnioMenosUnDia
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }



  private _filter(value: any): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : (value?.nombre || '').toLowerCase();
    return this.paquetes.filter(option =>
      option.nombre.toLowerCase().includes(filterValue)
    );
  }

  buscarPaquetes() {
    this.paqueteService.buscarPaquetes().subscribe({
      next: (data) => {
        this.paquetes = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      },
      error: (error) => {
        console.error('Error fetching packages:', error);
        this.snackBar.openSnackBar('Error al cargar los paquetes', 'Cerrar');
      }
    });
  }

  displayFn(paquete: any): string {
    return paquete?.nombre ? paquete.nombre : '';
  }

  onOptionSelected(event: any) {
    const selectedPackage = this.paquetes.find(p => p.idPaquete === event.option.value);
    if (selectedPackage) {
      this.polizaFormGroup.patchValue({
        idPaquete: selectedPackage.idPaquete
      });
      this.myControl.setValue(selectedPackage);
    }
  }


  firstFormGroup = this._formBuilder.group({
    primerNombre: new FormControl('', Validators.required),
    segundoNombre: new FormControl(''),
    tercerNombre: new FormControl(''),
    apellidoPrimero: new FormControl('', Validators.required),
    apellidoSegundo: new FormControl(''),
    apellidoTercero: new FormControl(''),
    nit: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    dpi: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
  });



  polizaFormGroup = this._formBuilder.group({
    nombrePoliza: new FormControl('', Validators.required),
    idPaquete: new FormControl('', Validators.required),
    fechaCreacion: new FormControl(this.hoy, Validators.required),
    fechaVencimiento: new FormControl(this.unAnioMenosUnDia, Validators.required),
  });



  addBeneficiaryForm() {
    const newFormGroup = this._formBuilder.group({
      primerNombre: new FormControl('', Validators.required),
      segundoNombre: new FormControl(''),
      tercerNombre: new FormControl(''),
      apellidoPrimero: new FormControl('', Validators.required),
      apellidoSegundo: new FormControl(''),
      apellidoTercero: new FormControl(''),
      participacion: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      parentesco: new FormControl('', Validators.required),
    });
    this.secondFormGroups.push(newFormGroup);
  }

  addDependienteForm() {
    const newFormGroup = this._formBuilder.group({
      primerNombre: new FormControl('', Validators.required),
      segundoNombre: new FormControl(''),
      tercerNombre: new FormControl(''),
      apellidoPrimero: new FormControl('', Validators.required),
      apellidoSegundo: new FormControl(''),
      apellidoTercero: new FormControl(''),
      parentesco: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
    });
    this.thirdFormGroups.push(newFormGroup);
  }


  addTelefonoForm() {
    const newFormGroup = this._formBuilder.group({
      telefono: new FormControl('', Validators.required),
    });
    this.telefonoFormGroups.push(newFormGroup);
  }
  addCorreoForm() {
    const newFormGroup = this._formBuilder.group({
      correo: new FormControl('', Validators.required),
    });
    this.correoFormGroups.push(newFormGroup);
  }

  addDireccionForm() {
    const newFormGroup = this._formBuilder.group({
      direccion: new FormControl('', Validators.required),
      tipoDireccion: new FormControl('', Validators.required),
    });
    this.direccionFormGroups.push(newFormGroup);
  }

  validateParticipationSum(): boolean {
    const participacionTotal = this.secondFormGroups.reduce((sum, form) => {
      const participacion = Number.parseFloat(form.get('participacion')?.value || '0');
      return sum + (Number.isNaN(participacion) ? 0 : participacion);
    }, 0);

    if (participacionTotal !== 100) {

      this.errorParticipacion = `La suma de las participaciones debe ser exactamente 100. Actualmente es ${participacionTotal}.`;
      return false;
    }
    this.errorParticipacion = null;
    return true;
  }

  async guardarPoliza() {
    const participacionValida = this.validateParticipationSum();
    if (!(this.firstFormGroup.valid && this.telefonoFormGroups.every(form => form.valid) &&
      this.correoFormGroups.every(form => form.valid) &&
      this.direccionFormGroups.every(form => form.valid))) {
      this.snackBar.openSnackBar('Formulario de cliente incompleto', 'Cerrar');
      return;
    }
    if (!(this.secondFormGroups.every(form => form.valid))) {
      this.snackBar.openSnackBar('Formulario de beneficiarios incompleto', 'Cerrar');
      return;
    }
    if (!(this.thirdFormGroups.every(form => form.valid))) {
      this.snackBar.openSnackBar('Formulario de dependientes incompleto', 'Cerrar');
      return;
    }
    if (!participacionValida) {
      this.snackBar.openSnackBar('La suma de las participaciones debe ser 100', 'Cerrar');
      return;
    }

    const allFormsValid =
      this.firstFormGroup.valid &&
      this.secondFormGroups.every(form => form.valid) &&
      this.thirdFormGroups.every(form => form.valid) &&
      this.telefonoFormGroups.every(form => form.valid) &&
      this.correoFormGroups.every(form => form.valid) &&
      this.direccionFormGroups.every(form => form.valid);

    if (allFormsValid && participacionValida) {

      const contratante = {
        ...this.firstFormGroup.value,
        telefonos: this.telefonoFormGroups.map(form => form.value.telefono),
        correos: this.correoFormGroups.map(form => form.value.correo),
        direcciones: this.direccionFormGroups.map(form => form.value),
      };

      const poliza = {
        nombrePoliza: this.polizaFormGroup.value.nombrePoliza,
        vendedor: this.cookies.get('idUsuario'),
        idPaquete: this.polizaFormGroup.value.idPaquete,
        fechaCreacion: this.polizaFormGroup.value.fechaCreacion,
        fechaVencimiento: this.polizaFormGroup.value.fechaVencimiento,
        contratante: contratante,
        beneficiarios: this.secondFormGroups.map(form => form.value),
        dependientes: this.thirdFormGroups.map(form => form.value),
      };

      this.isLoading = true;
      this.polizaServicio.guardarPoliza(poliza).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.snackBar.openSnackBar(data.response, 'Cerrar');
          this.firstFormGroup.reset();
          for (const form of this.secondFormGroups) {
            form.reset();
          }
          this.secondFormGroups = [this._formBuilder.group({
            primerNombre: new FormControl('', Validators.required),
            segundoNombre: new FormControl(''),
            tercerNombre: new FormControl(''),
            apellidoPrimero: new FormControl('', Validators.required),
            apellidoSegundo: new FormControl(''),
            apellidoTercero: new FormControl(''),
            participacion: new FormControl('', Validators.required),
            genero: new FormControl('', Validators.required),
            parentesco: new FormControl('', Validators.required),
          })];
          for (const form of this.thirdFormGroups) {
            form.reset();
          }
          this.thirdFormGroups = [this._formBuilder.group({
            primerNombre: new FormControl('', Validators.required),
            segundoNombre: new FormControl(''),
            tercerNombre: new FormControl(''),
            apellidoPrimero: new FormControl('', Validators.required),
            apellidoSegundo: new FormControl(''),
            apellidoTercero: new FormControl(''),
            parentesco: new FormControl('', Validators.required),
            fechaNacimiento: new FormControl('', Validators.required),
          })];
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          this.isLoading = false;
          this.snackBar.openSnackBar('Error al emitir la poliza', 'Cerrar');
        }
      });
    } else {
      this.firstFormGroup.markAllAsTouched();
      for (const form of this.secondFormGroups) {
        form.markAllAsTouched();
      }
      for (const form of this.thirdFormGroups) {
        form.markAllAsTouched();
      }
    }
  }


  buscarClientePorDocumento(documento: string, tipoDocumento: string) {
    if (this.clienteEstaVacio) {
      this.isLoading = true;
      this.clienteService.buscarClientePorDocumento(documento).subscribe({
        next: (data) => {

          if (data) {
            this.isLoading = false;
            this.cliente = data;
            this.clienteEstaVacio = false;

            const fechaNacimientoFormateada = data.fechaNacimiento
              ? new Date(data.fechaNacimiento).toISOString().split('T')[0]
              : '';

            this.firstFormGroup.patchValue({
              primerNombre: data.primerNombre || '',
              segundoNombre: data.segundoNombre || '',
              tercerNombre: data.tercerNombre || '',
              apellidoPrimero: data.apellidoPrimero || '',
              apellidoSegundo: data.apellidoSegundo || '',
              apellidoTercero: data.apellidoTercero || '',
              nit: data.nit || '',
              dpi: data.dpi || '',
              fechaNacimiento: fechaNacimientoFormateada,
              genero: data.genero || ''
            });

            this.cargarTelefonos(data.telefonos);
            this.cargarCorreos(data.correos);
            this.cargarDirecciones(data.direcciones);

            this.snackBar.openSnackBar('Cliente encontrado', 'Cerrar');
          } else {
            this.clienteEstaVacio = true;
            this.snackBar.openSnackBar('No se encontró el cliente', 'Cerrar');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.clienteEstaVacio = true;
          this.snackBar.openSnackBar('Error al buscar el cliente', 'Cerrar');
          console.error('Error al buscar cliente:', error);
        }
      });
    }
  }

  private cargarTelefonos(telefonos: any[] | undefined): void {
    if (!telefonos?.length) return;

    this.telefonoFormGroups = telefonos.map(t =>
      this._formBuilder.group({
        telefono: new FormControl(t.telefono, Validators.required)
      })
    );
  }

  private cargarCorreos(correos: any[] | undefined): void {
    if (!correos?.length) return;

    this.correoFormGroups = correos.map(c =>
      this._formBuilder.group({
        correo: new FormControl(c.email, [Validators.required, Validators.email])
      })
    );
  }

  private cargarDirecciones(direcciones: any[] | undefined): void {
    if (!direcciones?.length) return;

    this.direccionFormGroups = direcciones.map(d =>
      this._formBuilder.group({
        direccion: new FormControl(d.direccion, Validators.required),
        tipoDireccion: new FormControl(d.tipoDireccion, Validators.required)
      })
    );
  }



}
