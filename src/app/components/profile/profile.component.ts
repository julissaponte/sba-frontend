import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CustomerService } from '../../services/customer.service';
import { ModalEditProfileComponent } from '../modal-edit-profile/modal-edit-profile.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private customerService: CustomerService,
              public dialog: MatDialog) { }

  progress_bar: boolean = false;
  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  user:any;
  data:any;
  ngOnInit() {
    this.progress_bar = true;
    if(this.metadata.usertype == 1){
      this.customerService.getCustomerByIdAccount(this.metadata.id).subscribe(res=>{
        this.data = res;
        this.progress_bar = false;
        this.user = {
          firstName: res.firstName,
          lastName: res.lastName,
          cellphone: res.cellphone,
          email: res.email,
          username: res.account.username,
          city: res.district.city.name,
          district: res.district.name,
          dni: res.dni
        }
      })
    }
    else if(this.metadata.usertype == 2){
      this.employeeService.getEmployeeByIdAccount(this.metadata.id).subscribe(res=>{
        this.data = res;
        this.progress_bar = false;
        this.user = {
          firstName: res.firstName,
          lastName: res.lastName,
          cellphone: res.cellphone,
          email: res.email,
          username: res.account.username,
          city: res.district.city.name,
          district: res.district.name,
          dni: res.dni,
          birthday: res.birthday,
          specialty: res.specialty.name
        }
      })
    }
  }

  abrirModalEditar(){
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      width: '900px',
      height: '650px',
      data: {user: this.data, metadata: this.metadata}
    })
    
    dialogRef.componentInstance.edit.subscribe(data =>{
      
      if(this.metadata.usertype == 1) {
        this.user = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          cellphone: data.user.cellphone,
          email: data.user.email,
          city: data.city.name,
          district: data.district.name,
          dni: data.user.dni
        }
      } else if(this.metadata.usertype == 2) {
        this.user = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          cellphone: data.user.cellphone,
          email: data.user.email,
          city: data.city.name,
          district: data.district.name,
          dni: data.user.dni,
          birthday: data.user.birthday,
          specialty: data.specialty.name
        }
      }
     
    })
  }

}
