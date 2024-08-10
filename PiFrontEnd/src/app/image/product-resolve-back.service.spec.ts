import { TestBed } from '@angular/core/testing';

import { ProductResolveBackService } from './product-resolve-back.service';

describe('ProductResolveBackService', () => {
  let service: ProductResolveBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResolveBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
