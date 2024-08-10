import { TestBed } from '@angular/core/testing';

import { CarppolingServiceService } from './carppoling-service.service';

describe('CarppolingServiceService', () => {
  let service: CarppolingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarppolingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
