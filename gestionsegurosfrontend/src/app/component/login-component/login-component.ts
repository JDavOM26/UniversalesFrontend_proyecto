import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string | null = null;
  isLoading: boolean = false; 

  constructor(
    private readonly authService: LoginService, 
    private readonly router: Router, 
    private readonly cookies: CookieService
  ) {}

  submit() {
    if (this.form.invalid) {
      this.errorMessage = 'Debe completar todos los campos';
      return;
    }

    this.isLoading = true;
    const user = this.form.value; 

    this.authService.login(user).subscribe({
      next: (response) => {
        this.cookies.set('token', response.jwt, 1); 
        this.cookies.set('idUsuario', response.idUsuario.toString(), 1);
        this.cookies.set('rol', response.rol, 1);

        this.isLoading = false;

        if (this.cookies.get('rol') === 'Administrador') {
          this.router.navigate(['/dashboard']);
        }
        if (this.cookies.get('rol') === 'Emisor') {
          this.router.navigate(['/coberturas']);
        }
         if (this.cookies.get('rol') === 'Perito') {
          this.router.navigate(['/seguimiento-reclamo']);
        }
        if (this.cookies.get('rol') === 'Ajustador') {
          this.router.navigate(['/ajustador-reclamo']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error || 'Usuario o contraseña inválidos';
      }
    });
  }

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();
}
