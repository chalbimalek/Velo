import { TestBed } from '@angular/core/testing';

import { CarpoolingProcessingService } from './carpooling-processing.service';

describe('CarpoolingProcessingService', () => {
  let service: CarpoolingProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarpoolingProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
