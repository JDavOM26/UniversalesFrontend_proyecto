import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisorPolizaComponent } from './emisor-poliza-component';

describe('EmisorPolizaComponent', () => {
  let component: EmisorPolizaComponent;
  let fixture: ComponentFixture<EmisorPolizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmisorPolizaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmisorPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
