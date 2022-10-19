import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailCustomerComponent } from './modal-detail-customer.component';

describe('ModalDetailCustomerComponent', () => {
  let component: ModalDetailCustomerComponent;
  let fixture: ComponentFixture<ModalDetailCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
