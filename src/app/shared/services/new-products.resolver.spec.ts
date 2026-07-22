import { TestBed } from '@angular/core/testing';

import { NewProductsResolver } from './new-products.resolver';

describe('NewProductsResolver', () => {
  let resolver: NewProductsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewProductsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
