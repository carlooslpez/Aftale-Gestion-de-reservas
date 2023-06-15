import { TestBed } from '@angular/core/testing';

import { CosntService } from './cosnt.service';

describe('CosntService', () => {
  let service: CosntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
