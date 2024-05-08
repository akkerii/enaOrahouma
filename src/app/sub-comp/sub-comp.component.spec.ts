import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCompComponent } from './sub-comp.component';

describe('SubCompComponent', () => {
  let component: SubCompComponent;
  let fixture: ComponentFixture<SubCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCompComponent]
    });
    fixture = TestBed.createComponent(SubCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
