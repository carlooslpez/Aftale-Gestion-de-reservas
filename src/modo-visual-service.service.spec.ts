import { TestBed } from '@angular/core/testing';

import { ModoVisualServiceService } from './modo-visual-service.service';

describe('ModoVisualServiceService', () => {
  let service: ModoVisualServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModoVisualServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
