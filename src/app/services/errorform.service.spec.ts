import { TestBed } from '@angular/core/testing';

import { ErrorformService } from './errorform.service';

describe('ErrorformService', () => {
  let service: ErrorformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
