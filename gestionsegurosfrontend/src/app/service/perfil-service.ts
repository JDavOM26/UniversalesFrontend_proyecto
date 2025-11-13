import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private readonly apiUrl = 'http://localhost:8585/api/noauth/perfil';

  constructor(private readonly http: HttpClient) {
  }

  actualizarImagen(id: number, imagen: File): Observable<any> {
    let formData = new FormData();
    let params = new HttpParams().set('id', id);
    formData.append('imagen', imagen, imagen.name);
    return this.http.post(`${this.apiUrl}/imagen`, formData, {params});
  }

  obtenerDatosPerfil(id: number): Observable<any>{
    let params = new HttpParams().set('id', id);
    return this.http.get(`${this.apiUrl}/obtener`, {params});
  }
}
