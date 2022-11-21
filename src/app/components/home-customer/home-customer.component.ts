import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../../services/technician.service';
import { AppointmentService} from '../../services/appointment.service';
import { CustomerService } from '../../services/customer.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalDetalleAppointmentCComponent } from '../modal-detalle-appointment-c/modal-detalle-appointment-c.component';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {

  progress_bar: boolean = false;
  metadata:any = JSON.parse(localStorage.getItem('metadata'))
  displayedColumns: string[] = ['firstname', 'lastname', 'fecha', 'status', 'details'];
  dataSource: any;
  constructor(private technicianService: TechnicianService,
              private appointmentService: AppointmentService,
              public dialog: MatDialog,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.progress_bar = true;
    this.customerService.getCustomerById(this.metadata.id).subscribe(customer=>{
      console.log('hola', customer) 
      this.appointmentService.getAppointmentByCustomerId(customer.userId).subscribe(res=>{
        console.log('citas customer', res);
        this.progress_bar = false;
        this.dataSource = res;
      })
    })
    
    
  }


  verDetalles(element){
    console.log(element);
    const dialogRef = this.dialog.open(ModalDetalleAppointmentCComponent,{
      width: '1100px',
      height: '600px',
      data: element 
      
    })
  }

}
