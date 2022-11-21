import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-modal-detalle-appointment-e',
  templateUrl: './modal-detalle-appointment-e.component.html',
  styleUrls: ['./modal-detalle-appointment-e.component.css']
})
export class ModalDetalleAppointmentEComponent implements OnInit {

  customerAddress: string;
  customerEmail: string;
  constructor(private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('raaa',this.data);
    this.customerService.getCustomerById(this.data.appointmentData.customerId).subscribe((customer:any)=>{
      this.customerAddress = customer.user.address;
      this.customerEmail = customer.user.email;
    })
  }

}
