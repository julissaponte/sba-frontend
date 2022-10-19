import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleAppointmentEComponent } from './modal-detalle-appointment-e.component';

describe('ModalDetalleAppointmentEComponent', () => {
  let component: ModalDetalleAppointmentEComponent;
  let fixture: ComponentFixture<ModalDetalleAppointmentEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleAppointmentEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleAppointmentEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
