import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {
private readonly apiUrl = 'http://localhost:8585/api/auth/reclamos';

  constructor(private readonly http: HttpClient) {}

  guardarReclamo(reclamo: any): Observable<any> {
    return this.postUrl(`${this.apiUrl}/emitir-reclamo`, reclamo);
  }

   aprobarReclamo(reclamo: any): Observable<any> {
    return this.postUrl(`${this.apiUrl}/aprobar-reclamo`, reclamo);
  }
  rechazarReclamo(reclamo: any): Observable<any> {
    return this.postUrl(`${this.apiUrl}/rechazar-reclamo`, reclamo);
  }



  private postUrl(endpoint: string, objeto: any): Observable<any> {
    return this.http.post<any>(endpoint, objeto);
  }


    buscarReclamoAjustador(idUsuario: number): Observable<any> {
    const params = new HttpParams()
      .set('ajustador', idUsuario);
    return this.getUrl(`${this.apiUrl}/obtener-reclamos-usuario`, params);
  }

    buscarReclamosIngresados(): Observable<any> {
    return this.getUrl(`${this.apiUrl}/obtener-reclamos-ingresados`);
  }


    private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }

}
