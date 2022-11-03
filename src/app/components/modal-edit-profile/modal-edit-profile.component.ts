import { Component, OnInit, Inject, Output, EventEmitter  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CityService } from '../../services/city.service';
import { SpecialtyService } from '../../services/specialty.service';
import { TechnicianService } from '../../services/technician.service';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.css']
})
export class ModalEditProfileComponent implements OnInit {

  @Output() edit:any = new EventEmitter();
  editForm: FormGroup;

  progress_bar: boolean = false;

  cityAux: any;
  districtAux: any;
  specialtyAux: any;

  ID_SPECIALTY: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<ModalEditProfileComponent>,
              private customerService: CustomerService,
              private _snackBar: MatSnackBar,
              private technicianService: TechnicianService) { }

  ngOnInit() {
    if(this.data.metadata.userType == "Customer") {
      this.editForm = this._builderForm();
    } else{ 
      // this.specialtyService.getSpecialties().subscribe(res =>{
      //   this.specialties = res;
      // })
      this.editForm = this._builderForm2();
    }
    
  }
  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: [this.data.user.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.data.user.lastName, [Validators.required, Validators.pattern(pattern)]],
      phoneNumber: [this.data.user.phoneNumber, [Validators.required, Validators.pattern(pattern)]],
      imageUrl: [this.data.user.imageUrl, [Validators.required]],
    }) 
    return form;
  }
  /**Getters */
  get firstnameC() { return this.editForm.controls['firstname']; }
  get lastnameC() { return this.editForm.controls['lastname']; }
  get phoneNumberC() { return this.editForm.controls['phoneNumber']; }
  get imageUrlC() { return this.editForm.controls['imageUrl']}

  _builderForm2(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: [this.data.user.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.data.user.lastName, [Validators.required, Validators.pattern(pattern)]],
      phoneNumber: [this.data.user.phoneNumber, [Validators.required, Validators.pattern(pattern)]],
      description: [this.data.user.description, [Validators.required, Validators.pattern(pattern)]],
      imageUrl: [this.data.user.imageUrl, [Validators.required]],
    }) 
    return form;
  }

  get firstnameE() { return this.editForm.controls['firstname']; }
  get lastnameE() { return this.editForm.controls['lastname']; }
  get phoneNumberE() { return this.editForm.controls['phoneNumber']; }
  get descriptionE() { return this.editForm.controls['description']; }
  get imageUrlE() { return this.editForm.controls['imageUrl']}

  selectSpecialty(event) {
    this.specialtyAux = event.value;

  }

  editProfile(){
    this.progress_bar = true;

    if(this.data.metadata.userType == "Customer") { 
      
      let obj = {
        phoneNumber: this.phoneNumberC.value,
        firstName: this.firstnameC.value,
        lastName: this.lastnameC.value,
        description: "description",
        imageUrl: this.imageUrlC.value
      }
      
      this.customerService.updateCustomer(this.data.metadata.id, obj).subscribe(res =>{
        this.edit.emit(res)
        this._snackBar.open('Se editó el perfil con éxito!', 'Cerrar', {duration:4000, horizontalPosition:'start'})
        this.dialogRef.close(); 
        this.progress_bar = false;
      })

      
    } else {
      let obj = {
        phoneNumber: this.phoneNumberE.value,
        firstName: this.firstnameE.value,
        lastName: this.lastnameE.value,
        description: this.descriptionE.value,
        imageUrl: this.imageUrlE.value
        // specialty: {
        //   id: this.specialtyAux.id
        // }
      }
      
      this.technicianService.updateTechnician(this.data.metadata.id, obj).subscribe(res =>{ 
        this.edit.emit(res);
        this._snackBar.open('Se editó el perfil con éxito!', 'Cerrar', {duration:4000, horizontalPosition:'start'})
        this.dialogRef.close(); 
        this.progress_bar = false;
      })

    }

  }

}
