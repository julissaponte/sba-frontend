import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detail-customer',
  templateUrl: './modal-detail-customer.component.html',
  styleUrls: ['./modal-detail-customer.component.css']
})
export class ModalDetailCustomerComponent implements OnInit {

  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  constructor(@Inject(MAT_DIALOG_DATA) public customer: any) { }

  ngOnInit() {
  }

}
