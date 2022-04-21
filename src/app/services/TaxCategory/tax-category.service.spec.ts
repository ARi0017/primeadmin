import { TestBed } from '@angular/core/testing';

import { TaxCategoryService } from './tax-category.service';

describe('TaxCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxCategoryService = TestBed.get(TaxCategoryService);
    expect(service).toBeTruthy();
  });
});
