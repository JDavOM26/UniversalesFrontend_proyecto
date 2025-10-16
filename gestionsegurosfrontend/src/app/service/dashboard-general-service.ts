import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGeneralService {
  private readonly apiUrl = 'http://localhost:8585/api/auth/dashboard';

  constructor(private readonly http: HttpClient) { }

  obtenerDashboardGeneral(): Observable<any> {
    return this.getUrl(`${this.apiUrl}/obtener-dashboard-general`);
  }

  private getUrl(endpoint: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(endpoint, { params });
  }
}
