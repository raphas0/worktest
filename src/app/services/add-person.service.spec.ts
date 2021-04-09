import { TestBed } from '@angular/core/testing';

import { AddPersonService } from './add-person.service';

describe('AddPersonService', () => {
  let service: AddPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
