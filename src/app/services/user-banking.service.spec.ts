import { TestBed } from '@angular/core/testing';

import { UserBankingService } from './user-banking.service';

describe('UserBankingService', () => {
  let service: UserBankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
