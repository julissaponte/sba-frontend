import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAppointmentComponent } from './modal-create-appointment.component';

describe('ModalCreateAppointmentComponent', () => {
  let component: ModalCreateAppointmentComponent;
  let fixture: ComponentFixture<ModalCreateAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
