import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeymentreceiptComponent } from './peymentreceipt.component';

describe('PeymentreceiptComponent', () => {
  let component: PeymentreceiptComponent;
  let fixture: ComponentFixture<PeymentreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeymentreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeymentreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
