import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {
 private readonly apiUrl = 'http://localhost:8585/api/auth/coberturas';

  constructor(private readonly http: HttpClient) {}

  guardarCobertura(cobertura: any): Observable<any> {
    return this.postUrl(`${this.apiUrl}/crear-cobertura`, cobertura);
  }

   buscarCoberturas(): Observable<any> {
    return this.getUrl(`${this.apiUrl}/obtener-coberturas`);
  }

    buscarCoberturaPorPoliza(idPoliza: number): Observable<any> {
    const params = new HttpParams()
      .set('idPoliza', idPoliza);
   
    return this.getUrl(`${this.apiUrl}/obtener-coberturas-poliza`, params);
  }

  private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }

  private postUrl(endpoint: string, objeto: any): Observable<any> {
    return this.http.post<any>(endpoint, objeto);
  }

}
