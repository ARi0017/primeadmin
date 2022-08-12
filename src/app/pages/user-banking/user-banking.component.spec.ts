import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankingComponent } from './user-banking.component';

describe('UserBankingComponent', () => {
  let component: UserBankingComponent;
  let fixture: ComponentFixture<UserBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
