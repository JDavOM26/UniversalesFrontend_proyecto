import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly apiUrl = 'http://localhost:8585/api/auth/clientes';

  constructor(private readonly http: HttpClient) {}

      buscarClientePorDocumento(documento: string, tipoDocumento: string): Observable<any> {
    const params = new HttpParams()
      .set('documento', documento)
      .set('tipoDocumento', tipoDocumento);
   
    return this.getUrl(`${this.apiUrl}/buscar-cliente`, params);
  }

    private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }

}
