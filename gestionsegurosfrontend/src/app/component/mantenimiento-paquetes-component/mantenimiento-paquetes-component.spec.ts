import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPaquetesComponent } from './mantenimiento-paquetes-component';

describe('MantenimientoPaquetesComponent', () => {
  let component: MantenimientoPaquetesComponent;
  let fixture: ComponentFixture<MantenimientoPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantenimientoPaquetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
