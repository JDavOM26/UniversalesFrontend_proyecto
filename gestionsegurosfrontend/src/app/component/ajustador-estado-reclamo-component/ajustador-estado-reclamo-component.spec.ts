import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustadorEstadoReclamoComponent } from './ajustador-estado-reclamo-component';

describe('AjustadorEstadoReclamoComponent', () => {
  let component: AjustadorEstadoReclamoComponent;
  let fixture: ComponentFixture<AjustadorEstadoReclamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjustadorEstadoReclamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustadorEstadoReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
