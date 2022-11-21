import { Component, OnInit,  Inject, Output, EventEmitter  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomerService } from '../../services/customer.service'; 
import { PaymentMethodService } from '../../services/payment-method.service';
import { AppointmentService } from '../../services/appointment.service';
import {AbstractControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-create-appointment',
  templateUrl: './modal-create-appointment.component.html',
  styleUrls: ['./modal-create-appointment.component.css']
})
export class ModalCreateAppointmentComponent implements OnInit {

  progress_bar: boolean = false;
  TODAY_DATE = new Date;
  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  @Output() appintmentEmit:any = new EventEmitter();
  CUSTOMER_ID: number;
  EMPLOYEE_ID: number;
  appointmentForm: FormGroup;
  listPMethods: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder : FormBuilder,
              private customerService: CustomerService,
              private paymentMethodService: PaymentMethodService,
              private appointmentService: AppointmentService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ModalCreateAppointmentComponent>) { }

  ngOnInit() {
    console.log('data', this.data)
    this.EMPLOYEE_ID = this.data.user.id;
    this.customerService.getCustomerById(this.metadata.id).subscribe(res =>{
      console.log('res', res)
      this.CUSTOMER_ID = res.user.id;
    })

    this.paymentMethodService.getAllPaymentMethods().subscribe(res =>{
      console.log('pms', res)
      this.listPMethods = res;
    })
    this.appointmentForm = this._builderForm();
  }

  _builderForm(){
    let form = this._formBuilder.group({
      appointmentDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      paymentMethod: [this.listPMethods, [Validators.required]]
    }) 
    return form;
  }

  /**Getters */
  get appointmentDate() { return this.appointmentForm.controls['appointmentDate']; }
  get description() { return this.appointmentForm.controls['description']; }
  get paymentMethod() { return this.appointmentForm.controls['paymentMethod']; }

  crearAppointment(){
    this.progress_bar = true;
    console.log(this.appointmentForm.value)
    let obj = {
        appointmentDate: this.appointmentDate.value,
        customerId: this.CUSTOMER_ID,
        description: this.description.value,
        technicianId: this.EMPLOYEE_ID,
        paymentMethodId: this.paymentMethod.value,
        status: "Pendiente",
        valorization: 0
    }

    this.appointmentService.insertAppointment(obj).subscribe(res =>{
      console.log(res)
      this.progress_bar = false;
      this._snackBar.open('Se creó la cita con éxito!', 'Cerrar', {duration:4000, horizontalPosition:'start'})
      this.dialogRef.close();
    })
  }

}
