import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolizaCoberturaService {
   private readonly apiUrl = 'http://localhost:8585/api/auth/poliza-cobertura';

  constructor(private readonly http: HttpClient) {}

      obtenerSumaAseguradaDisponible(idPoliza: number, idCobertura: number ): Observable<any> {
    const params = new HttpParams()
      .set('idPoliza', idPoliza)
      .set('idCobertura', idCobertura);
   
    return this.getUrl(`${this.apiUrl}/obtener-suma-asegurada`, params);
  }

    private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }
}
