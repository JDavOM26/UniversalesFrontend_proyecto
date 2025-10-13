import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisorPaqueteComponent } from './emisor-paquete-component';

describe('EmisorPaqueteComponent', () => {
  let component: EmisorPaqueteComponent;
  let fixture: ComponentFixture<EmisorPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmisorPaqueteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmisorPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
