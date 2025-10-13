import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-component',
  standalone: false,
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.css'
})
export class AdminDashboardComponent {
  isLoading: boolean = true;
  
primaDia: number = 0;
  primaMes: number = 0;

  costosDia: number = 0;
  costosMes: number = 0;

  polizasDia: number = 0;
  polizasMes: number = 0;

  siniestrosDia: number = 0;
  siniestrosMes: number = 0;

  constructor() {
     setTimeout(() => {
        this.isLoading = false;
      }, 1500);
   }

}
