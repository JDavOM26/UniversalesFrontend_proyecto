import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Empleado {
  username: string;
  password: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:8585/api/auth/usuarios';

  constructor(private readonly http: HttpClient) {}

  guardarUsuario(usuario: Empleado, imagen?: File): Observable<any> {
    const formData = new FormData();

    const usuarioBlob = new Blob([JSON.stringify(usuario)], { type: 'application/json' });
    formData.append('usuario', usuarioBlob);

    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    return this.http.post(`${this.apiUrl}/crear-usuario`, formData);
  }

}
