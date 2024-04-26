import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentIntComponent } from './payment-int.component';

describe('PaymentIntComponent', () => {
  let component: PaymentIntComponent;
  let fixture: ComponentFixture<PaymentIntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentIntComponent]
    });
    fixture = TestBed.createComponent(PaymentIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
