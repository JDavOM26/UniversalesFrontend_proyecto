import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../service/perfil-service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mi-perfil',
  standalone: false,
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css'
})
export class MiPerfil implements OnInit {
  perfilDato: any = null;
  imagenPreview: string | null = null;
  imagenFile: File | null = null;
  form: FormGroup = new FormGroup({
    imagen: new FormControl('')
  });

  constructor(private readonly perfilService: PerfilService, private readonly cookieService: CookieService, private readonly _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const id = Number.parseInt(this.cookieService.get('idUsuario'));
    this.perfilService.obtenerDatosPerfil(id).subscribe({
      next: (respuesta: any[]) => {
        this.perfilDato = respuesta;
      },
    });
  }


  getImagen(): string | undefined {
    const b64 = this.perfilDato.imagen;
    if (!b64) return undefined;
    return `data:image/png;base64,${b64}`;
  }

  onFileSelected(event: Event): void {
    let input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imagenFile = null;
      this.imagenPreview = null;
      return;
    }

    this.imagenFile = input.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
    };
    reader.readAsDataURL(this.imagenFile);
  }

  actualizarImagen(): void {
    if (!this.imagenFile) return;
    const id = Number.parseInt(this.cookieService.get('idUsuario'));

    this.perfilService.actualizarImagen(id, this.imagenFile).subscribe({
      next: () => {
        this.cargarDatos();
        this.form.reset();
        this.imagenFile = null;
        this.imagenPreview = null;
        this._snackBar.open('Imagen actualizada correctamente', 'cerrar', {duration:4000})
      },
      error: () => {
        this._snackBar.open('Error al actualizar imagen', 'Cerrar');
      }
    });
  }
}
