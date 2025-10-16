import { Component, OnInit } from '@angular/core';
import { DashboardGeneralService } from '../../service/dashboard-general-service';
interface DashboardData {
  PRIMAVENDIDADIA: number;
  PRIMAVENDIDAMES: number;
  POLIZASVENDIDASDIA: number;
  POLIZASVENDIDASMES: number;
  COSTOSINIESTROSDIA: number;
  COSTOSINIESTROSMES: number;
  SINIESTROSATENDIDOSDIA: number;
  SINIESTROSATENDIDOSMES: number;
}

@Component({
  selector: 'app-admin-dashboard-component',
  standalone: false,
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.css'
})
export class AdminDashboardComponent implements OnInit {
  isLoading: boolean = true;
  dashboardData: DashboardData = {
    PRIMAVENDIDADIA: 0,
    PRIMAVENDIDAMES: 0,
    POLIZASVENDIDASDIA: 0,
    POLIZASVENDIDASMES: 0,
    COSTOSINIESTROSDIA: 0,
    COSTOSINIESTROSMES: 0,
    SINIESTROSATENDIDOSDIA: 0,
    SINIESTROSATENDIDOSMES: 0
  };



  constructor(private readonly dashboardService: DashboardGeneralService) {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.obtenerDashboardGeneral();
  }

  obtenerDashboardGeneral(): void {
    this.isLoading = true;
    this.dashboardService.obtenerDashboardGeneral().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar dashboard:', error);
        this.isLoading = false;
      }
    });
  }
}