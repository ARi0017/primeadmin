/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BannermasterService } from './bannermaster.service';

describe('Service: Bannermaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BannermasterService]
    });
  });

  it('should ...', inject([BannermasterService], (service: BannermasterService) => {
    expect(service).toBeTruthy();
  }));
});
