import { TestBed } from '@angular/core/testing';

import { CollocationServiceService } from './collocation-service.service';

describe('CollocationServiceService', () => {
  let service: CollocationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollocationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
