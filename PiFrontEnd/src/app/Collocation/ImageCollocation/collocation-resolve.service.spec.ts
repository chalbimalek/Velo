import { TestBed } from '@angular/core/testing';

import { CollocationResolveService } from './collocation-resolve.service';

describe('CollocationResolveService', () => {
  let service: CollocationResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollocationResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
