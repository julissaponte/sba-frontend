import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleAppointmentCComponent } from './modal-detalle-appointment-c.component';

describe('ModalDetalleAppointmentCComponent', () => {
  let component: ModalDetalleAppointmentCComponent;
  let fixture: ComponentFixture<ModalDetalleAppointmentCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleAppointmentCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleAppointmentCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
