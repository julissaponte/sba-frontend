import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../../services/technician.service';
import { CustomerService } from '../../services/customer.service';
import { ModalEditProfileComponent } from '../modal-edit-profile/modal-edit-profile.component';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private technicianService: TechnicianService,
              private customerService: CustomerService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  progress_bar: boolean = false;
  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  user:any;
  data:any;
  userEmail: string;
  ngOnInit() {
    this.progress_bar = true;
    if(this.metadata.userType == "Customer"){
      this.customerService.getCustomerById(this.metadata.id).subscribe(res=>{
        this.data = res;
        this.authService.getUserByID(this.data.userId).subscribe(res => {
          this.progress_bar = false;
          this.userEmail = res.email;
          this.user = {
            firstName: this.data.firstName,
            lastName: this.data.lastName,
            phoneNumber: this.data.phoneNumber,
            imageUrl: this.data.imageUrl,
            email: this.userEmail,
            // region: res.address.region,
            // province: res.address.province,
            // district: res.address.district,
            // fullAddress: res.address.fullAddress,
          }
        })
      })
    }
    else{
      this.technicianService.getTechnicianById(this.metadata.id).subscribe(res=>{
        this.data = res;
        this.authService.getUserByID(this.data.userId).subscribe(res => {
          this.progress_bar = false;
          this.userEmail = res.email;
          this.user = {
            firstName: this.data.firstName,
            lastName: this.data.lastName,
            phoneNumber: this.data.phoneNumber,
            imageUrl: this.data.imageUrl,
            description: this.data.description,
            email: this.userEmail,
            // region: res.address.region,
            // province: res.address.province,
            // district: res.address.district,
            // fullAddress: res.address.fullAddress,
          }
        })
      })
    }
  }

  abrirModalEditar(){
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      width: '900px',
      height: '650px',
      data: {user: this.user, metadata: this.metadata}
    })
    
    dialogRef.componentInstance.edit.subscribe(data =>{
      
      if(this.metadata.userType == "Customer") {
        this.user = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          imageUrl: data.imageUrl,
          email: this.userEmail
        }
      } else{
        this.user = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          description: data.description,
          imageUrl: data.imageUrl,
          email: this.userEmail
        }
      }
     
    })
  }

}
