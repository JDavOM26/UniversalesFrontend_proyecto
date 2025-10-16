import { TestBed } from '@angular/core/testing';

import { DashboardGeneralService } from './dashboard-general-service';

describe('DashboardGeneralService', () => {
  let service: DashboardGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
