import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionPayableComponent } from './commission-payable.component';

describe('CommissionPayableComponent', () => {
  let component: CommissionPayableComponent;
  let fixture: ComponentFixture<CommissionPayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionPayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
