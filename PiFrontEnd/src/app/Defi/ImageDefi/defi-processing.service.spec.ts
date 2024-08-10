import { TestBed } from '@angular/core/testing';

import { DefiProcessingService } from './defi-processing.service';

describe('DefiProcessingService', () => {
  let service: DefiProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefiProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
