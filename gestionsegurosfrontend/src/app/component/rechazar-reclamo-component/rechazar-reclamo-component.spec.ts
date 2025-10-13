import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarReclamoComponent } from './rechazar-reclamo-component';

describe('RechazarReclamoComponent', () => {
  let component: RechazarReclamoComponent;
  let fixture: ComponentFixture<RechazarReclamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechazarReclamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazarReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
