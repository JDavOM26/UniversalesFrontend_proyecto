import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent implements OnInit {
  private readonly cookies: CookieService;
 rol: string = '';


  constructor( cookies: CookieService) {
    this.cookies = cookies;
  }

  ngOnInit() {
    this.rol = this.cookies.get('rol'); 
  }
}
