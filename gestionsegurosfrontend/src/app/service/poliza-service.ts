import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
 private readonly apiUrl = 'http://localhost:8585/api/auth/polizas';

  constructor(private readonly http: HttpClient) {}

 guardarPoliza(poliza: any): Observable<any> {
  return this.postUrl(`${this.apiUrl}/emitir-poliza`, poliza);
}

 

  

   buscarPoliza(valor:string, page: number, size: number): Observable<any> {
    let params = new HttpParams()
    .set('valor', valor)
      .set('page', page.toString())
      .set('size', size.toString());
    
  
    return this.http.get(`${this.apiUrl}/buscar-poliza-reclamo`, { params });
  }

   buscarPolizaPaginado(page: number, size: number, filter?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get(`${this.apiUrl}/buscar-poliza-paginado`, { params });
  }


    private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }


  private postUrl(endpoint: string, objeto: any): Observable<any> {
    return this.http.post<any>(endpoint, objeto);
  }

}
