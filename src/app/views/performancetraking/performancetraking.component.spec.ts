import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancetrakingComponent } from './performancetraking.component';

describe('PerformancetrakingComponent', () => {
  let component: PerformancetrakingComponent;
  let fixture: ComponentFixture<PerformancetrakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancetrakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancetrakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
