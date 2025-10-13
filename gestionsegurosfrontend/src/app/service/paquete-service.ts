import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
 private readonly apiUrl = 'http://localhost:8585/api/auth/paquetes';

  constructor(private readonly http: HttpClient) {}

  guardarPaquete(paquete: any): Observable<any> {
    return this.postUrl(`${this.apiUrl}/crear-paquete`, paquete);
  }

   buscarPaquetes(): Observable<any> {
    return this.getUrl(`${this.apiUrl}/obtener-paquetes`);
  }

  private postUrl(endpoint: string, objeto: any): Observable<any> {
    return this.http.post<any>(endpoint, objeto);
  }

    private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }

}