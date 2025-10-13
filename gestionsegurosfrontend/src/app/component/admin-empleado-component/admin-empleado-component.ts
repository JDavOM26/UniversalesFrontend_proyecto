import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario-service';
import { SnackBarService } from '../../service/snack-bar-service';

interface Empleado {
  username: string;
  password: string;
  rol: string;
}

interface Rol {
  value: string;
}

@Component({
  selector: 'app-admin-empleado-component',
  standalone: false,
  templateUrl: './admin-empleado-component.html',
  styleUrl: './admin-empleado-component.css'
})
export class AdminEmpleadoComponent {
  private  readonly usuarioServicio: UsuarioService; 

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required)
  });

  isLoading: boolean = true;

  options: Rol[] = [
    { value: 'Administrador' },
    { value: 'Emisor' },
    { value: 'Perito' },
    { value: 'Ajustador' }
  ];
   
  constructor( usuarioServicio: UsuarioService, private readonly snackBar: SnackBarService) {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    this.usuarioServicio = usuarioServicio;
    
  }

  async guardarUsuario() {
    if (this.form.valid) {
      const usuario: Empleado = this.form.value; 

      this.isLoading = true;
      this.usuarioServicio.guardarUsuario(usuario).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.snackBar.openSnackBar('Usuario guardado exitosamente', 'Cerrar');
          this.form.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.openSnackBar('Error al guardar usuario', 'Cerrar');
        }
      });
    } else {
      this.form.markAllAsTouched(); 
    }
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
}
