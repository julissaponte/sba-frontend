import { TestBed } from '@angular/core/testing';

import { SpecialtyService } from './specialty.service';

describe('SpecialtyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialtyService = TestBed.get(SpecialtyService);
    expect(service).toBeTruthy();
  });
});
