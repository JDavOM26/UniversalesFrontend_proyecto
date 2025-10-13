import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustadorReclamoComponent } from './ajustador-reclamo-component';

describe('AjustadorReclamoComponent', () => {
  let component: AjustadorReclamoComponent;
  let fixture: ComponentFixture<AjustadorReclamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjustadorReclamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustadorReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
