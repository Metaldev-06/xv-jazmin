import { TestBed } from '@angular/core/testing';

import { ConfirmationData } from './confirmation-data';

describe('ConfirmationData', () => {
  let service: ConfirmationData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
