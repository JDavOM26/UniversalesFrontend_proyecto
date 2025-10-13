import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponseDto {
  jwt: string;
  idUsuario: number;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = 'http://localhost:8585/api/noauth/login';

  constructor(private readonly http: HttpClient) { }

  login(usuario: any): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      this.apiUrl,
      usuario
    );
  }
}
