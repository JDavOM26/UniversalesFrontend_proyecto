import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
 private readonly apiUrl = 'http://localhost:8585/api/auth/polizas';

  constructor(private readonly http: HttpClient) {}

 guardarPoliza(poliza: any): Observable<string> {
  return this.postUrl(`${this.apiUrl}/emitir-poliza`, poliza);
}

 buscarPoliza(valor: string): Observable<any> {
    const params = new HttpParams()
      .set('valor', valor);
   
    return this.getUrl(`${this.apiUrl}/buscar-poliza`, params);
  }


    private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }


 private postUrl(endpoint: string, objeto: any): Observable<string> {
  return this.http.post(endpoint, objeto, { responseType: 'text' });
}

}
