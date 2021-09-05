import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalorderComponent } from './finalorder.component';

describe('FinalorderComponent', () => {
  let component: FinalorderComponent;
  let fixture: ComponentFixture<FinalorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
