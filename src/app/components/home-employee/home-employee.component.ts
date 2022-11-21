import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../../services/technician.service';
import { AppointmentService} from '../../services/appointment.service';
import {MatDialog} from '@angular/material/dialog';
// import { ModalDetalleAppointmentComponent } from '../modal-detalle-appointment/modal-detalle-appointment.component';
import { ModalDetalleAppointmentEComponent } from '../modal-detalle-appointment-e/modal-detalle-appointment-e.component';
 

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
 
  progress_bar: boolean = false;
  metadata:any = JSON.parse(localStorage.getItem('metadata'))

  displayedColumns: string[] = ['firstname', 'lastname', 'fecha', 'status', 'details'];

  dataSource: any;
  constructor(private technicianService: TechnicianService,
              private appointmentService: AppointmentService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.progress_bar = true;
    this.technicianService.getTechnicianById(this.metadata.id).subscribe((technician:any)=>{
      
      this.appointmentService.getAppointmentByTechnicianId(technician.userId).subscribe(res=>{
        this.progress_bar = false;
        this.dataSource = res;
        console.log(res);
      })
    })
    
    
  }

  verDetalles(element){
    console.log(element);
    const dialogRef = this.dialog.open(ModalDetalleAppointmentEComponent,{
      width: '1100px',
      height: '600px',
      data: element 
      
    })
  }



}
