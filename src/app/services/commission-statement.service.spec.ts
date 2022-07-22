import { TestBed } from '@angular/core/testing';

import { CommissionStatementService } from './commission-statement.service';

describe('CommissionStatementService', () => {
  let service: CommissionStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
