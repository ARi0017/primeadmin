import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTreeComponent } from './agent-tree.component';

describe('AgentTreeComponent', () => {
  let component: AgentTreeComponent;
  let fixture: ComponentFixture<AgentTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
