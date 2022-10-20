import { TestBed } from '@angular/core/testing';

import { TechnicianService } from './technician.service';

describe('TechnicianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnicianService = TestBed.get(TechnicianService);
    expect(service).toBeTruthy();
  });
});
