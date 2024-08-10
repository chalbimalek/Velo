import { TestBed } from '@angular/core/testing';

import { CollocationProcessingService } from './collocation-processing.service';

describe('CollocationProcessingService', () => {
  let service: CollocationProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollocationProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
