import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarReclamoComponent } from './aprobar-reclamo-component';

describe('AprobarReclamoComponent', () => {
  let component: AprobarReclamoComponent;
  let fixture: ComponentFixture<AprobarReclamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AprobarReclamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobarReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
