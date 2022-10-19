import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailEmployeeComponent } from './modal-detail-employee.component';

describe('ModalDetailEmployeeComponent', () => {
  let component: ModalDetailEmployeeComponent;
  let fixture: ComponentFixture<ModalDetailEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
