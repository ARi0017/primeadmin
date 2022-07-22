import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionStatementComponent } from './commission-statement.component';

describe('CommissionStatementComponent', () => {
  let component: CommissionStatementComponent;
  let fixture: ComponentFixture<CommissionStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
