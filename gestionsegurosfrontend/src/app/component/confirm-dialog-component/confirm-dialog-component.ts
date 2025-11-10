import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  encapsulation: ViewEncapsulation.None, 
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      {{ data.message }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button 
        mat-raised-button 
        class="btn-custom" 
        (click)="onConfirm()">
        Confirmar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .btn-custom {
      background-color: #00457e !important;
      color: #fff !important;
      border: none !important;
      border-radius: 4px !important;
      padding: 0 16px !important;
      min-height: 36px !important;
      font-weight: 500 !important;
    }

    .btn-custom:hover {
      background-color: #00345e !important;
    }

    .btn-custom:focus {
      box-shadow: 0 0 0 2px rgba(0, 69, 126, 0.3) !important;
    }

    /* Opcional: estilo para el botón Cancelar */
    mat-dialog-actions button[first] {
      color: #666 !important;
    }

    mat-dialog-actions button[first]:hover {
      background-color: #f5f5f5 !important;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}