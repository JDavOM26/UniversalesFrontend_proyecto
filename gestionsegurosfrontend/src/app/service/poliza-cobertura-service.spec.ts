import { TestBed } from '@angular/core/testing';

import { PolizaCoberturaService } from './poliza-cobertura-service';

describe('PolizaCoberturaService', () => {
  let service: PolizaCoberturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolizaCoberturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
