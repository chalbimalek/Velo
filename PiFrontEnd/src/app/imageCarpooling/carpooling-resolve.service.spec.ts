import { TestBed } from '@angular/core/testing';

import { CarpoolingResolveService } from './carpooling-resolve.service';

describe('CarpoolingResolveService', () => {
  let service: CarpoolingResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarpoolingResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
