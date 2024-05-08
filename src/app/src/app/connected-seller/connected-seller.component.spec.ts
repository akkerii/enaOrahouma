import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedSellerComponent } from './connected-seller.component';

describe('ConnectedSellerComponent', () => {
  let component: ConnectedSellerComponent;
  let fixture: ComponentFixture<ConnectedSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectedSellerComponent]
    });
    fixture = TestBed.createComponent(ConnectedSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

