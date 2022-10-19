import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-appointment-c',
  templateUrl: './modal-detalle-appointment-c.component.html',
  styleUrls: ['./modal-detalle-appointment-c.component.css']
})
export class ModalDetalleAppointmentCComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }

}
