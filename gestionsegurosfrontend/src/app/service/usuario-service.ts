import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 private readonly apiUrl = 'http://localhost:8585/api/auth/usuarios';

  constructor(private readonly http: HttpClient) {}

  guardarUsuario(usuario: any): Observable<any> {
    return this.postUrl(`${this.apiUrl}/crear-usuario`, usuario);
  }


  private postUrl(endpoint: string, objeto: any): Observable<any> {
    return this.http.post<any>(endpoint, objeto);
  }

}

