import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSubComponent } from './plan-sub.component';

describe('PlanSubComponent', () => {
  let component: PlanSubComponent;
  let fixture: ComponentFixture<PlanSubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanSubComponent]
    });
    fixture = TestBed.createComponent(PlanSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
