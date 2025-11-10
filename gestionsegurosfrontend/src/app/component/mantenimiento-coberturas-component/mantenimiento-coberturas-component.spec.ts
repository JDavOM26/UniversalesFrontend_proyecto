import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCoberturasComponent } from './mantenimiento-coberturas-component';

describe('MantenimientoCoberturasComponent', () => {
  let component: MantenimientoCoberturasComponent;
  let fixture: ComponentFixture<MantenimientoCoberturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantenimientoCoberturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoCoberturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
