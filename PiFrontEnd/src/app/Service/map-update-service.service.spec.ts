import { TestBed } from '@angular/core/testing';

import { MapUpdateServiceService } from './map-update-service.service';

describe('MapUpdateServiceService', () => {
  let service: MapUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
