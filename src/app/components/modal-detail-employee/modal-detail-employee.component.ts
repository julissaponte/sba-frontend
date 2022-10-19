import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detail-employee',
  templateUrl: './modal-detail-employee.component.html',
  styleUrls: ['./modal-detail-employee.component.css']
})
export class ModalDetailEmployeeComponent implements OnInit {

  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  constructor(@Inject(MAT_DIALOG_DATA) public employee: any) { }

  ngOnInit() {
  }

}
