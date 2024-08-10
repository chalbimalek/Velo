import { TestBed } from '@angular/core/testing';

import { DefiServiceService } from './defi-service.service';

describe('DefiServiceService', () => {
  let service: DefiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
