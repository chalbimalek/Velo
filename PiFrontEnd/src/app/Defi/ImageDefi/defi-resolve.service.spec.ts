import { TestBed } from '@angular/core/testing';

import { DefiResolveService } from './defi-resolve.service';

describe('DefiResolveService', () => {
  let service: DefiResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefiResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
