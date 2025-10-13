import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeritoSeguimientoComponent } from './perito-seguimiento-component';

describe('PeritoSeguimientoComponent', () => {
  let component: PeritoSeguimientoComponent;
  let fixture: ComponentFixture<PeritoSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeritoSeguimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeritoSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
