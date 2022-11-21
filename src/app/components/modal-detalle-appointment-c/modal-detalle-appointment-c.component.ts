import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-modal-detalle-appointment-c',
  templateUrl: './modal-detalle-appointment-c.component.html',
  styleUrls: ['./modal-detalle-appointment-c.component.css']
})
export class ModalDetalleAppointmentCComponent implements OnInit {

  technicianEmail: string;

  constructor(private technicianService: TechnicianService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.technicianService.getTechnicianById(this.data.appointmentData.technicianId).subscribe((technician:any)=>{
      this.technicianEmail = technician.user.email;
    })
  }

}
