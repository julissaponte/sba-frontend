import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProfileComponent } from './modal-edit-profile.component';

describe('ModalEditProfileComponent', () => {
  let component: ModalEditProfileComponent;
  let fixture: ComponentFixture<ModalEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
