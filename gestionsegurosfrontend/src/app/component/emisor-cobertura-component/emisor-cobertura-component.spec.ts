import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisorCoberturaComponent } from './emisor-cobertura-component';

describe('EmisorCoberturaComponent', () => {
  let component: EmisorCoberturaComponent;
  let fixture: ComponentFixture<EmisorCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmisorCoberturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmisorCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
