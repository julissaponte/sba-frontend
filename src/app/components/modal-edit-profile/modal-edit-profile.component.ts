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
  cities: any[];
  districts: any[];
  specialties: any[];

  cityAux: any;
  districtAux: any;
  specialtyAux: any;

  ID_SPECIALTY: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<ModalEditProfileComponent>,
              private cityService: CityService,
              private specialtyService: SpecialtyService,
              private customerService: CustomerService,
              private _snackBar: MatSnackBar,
              private technicianService: TechnicianService) { }

  ngOnInit() {
    this.cityAux = this.data.user.district.city;
    this.districtAux = {id:this.data.user.district.id, name: this.data.user.district.name };
    this.specialtyAux = this.data.user.specialty;
    
    this.cityService.getCities().subscribe(res =>{
      this.cities = res;
    })

    if(this.data.metadata.usertype == 1) {
      this.editForm = this._builderForm();
    } else if(this.data.metadata.usertype == 2) { 
      this.specialtyService.getSpecialties().subscribe(res =>{
        this.specialties = res;
      })
      this.editForm = this._builderForm2();
    }
    
  }
  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: [this.data.user.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.data.user.lastName, [Validators.required, Validators.pattern(pattern)]],
      cellphone: [this.data.user.cellphone, [Validators.required, Validators.pattern(pattern)]],
      email: [this.data.user.email, [Validators.required, Validators.pattern(pattern)]],
      dni: [this.data.user.dni, [Validators.required, Validators.pattern(pattern)]],
      city: [this.data.user.city, [Validators.required]],
      district: [this.data.user.district, [Validators.required]]
    }) 
    return form;
  }
  /**Getters */
  get firstnameC() { return this.editForm.controls['firstname']; }
  get lastnameC() { return this.editForm.controls['lastname']; }
  get dniC() { return this.editForm.controls['dni']; }
  get emailC() { return this.editForm.controls['email']; }
  get cellphoneC() { return this.editForm.controls['cellphone']; }
  get cityC() { return this.editForm.controls['city']; }
  get districtC() { return this.editForm.controls['district']; }

  _builderForm2(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: [this.data.user.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.data.user.lastName, [Validators.required, Validators.pattern(pattern)]],
      cellphone: [this.data.user.cellphone, [Validators.required, Validators.pattern(pattern)]],
      email: [this.data.user.email, [Validators.required, Validators.pattern(pattern)]],
      dni: [this.data.user.dni, [Validators.required, Validators.pattern(pattern)]],
      birthday: [this.data.user.birthday, [Validators.required]],
      specialty: [this.data.user.specialty.id, [Validators.required]],
      city: [this.data.user.district.city.id, [Validators.required]],
      district: [this.data.user.district.id, [Validators.required]]
    }) 
    return form;
  }

  get firstnameE() { return this.editForm.controls['firstname']; }
  get lastnameE() { return this.editForm.controls['lastname']; }
  get dniE() { return this.editForm.controls['dni']; }
  get emailE() { return this.editForm.controls['email']; }
  get cellphoneE() { return this.editForm.controls['cellphone']; }
  get cityE() { return this.editForm.controls['city']; }
  get districtE() { return this.editForm.controls['district']; }
  get birthdayE() { return this.editForm.controls['birthday']; }
  get specialtyE() { return this.editForm.controls['specialty']; }

  selectCity(event){
    this.cityAux = event.value;
    this.cityService.getDistrictsByCity(event.value.id).subscribe(res=>{
      this.districts = res;
    })
  }

  selectDistrict(event){
    this.districtAux = event.value;

  }

  selectSpecialty(event) {
    this.specialtyAux = event.value;

  }

  editProfile(){
    this.progress_bar = true;

    if(this.data.metadata.usertype == 1) { 
      
      let obj = {
        account: {
          id: this.data.metadata.id,
        },
        cellphone: this.cellphoneC.value,
        district: {
          city: {
            id: this.cityAux.id
          },
          id: this.districtAux.id
        },
        dni: this.dniC.value,
        email: this.emailC.value,
        firstName: this.firstnameC.value,
        lastName: this.lastnameC.value
      }
      
      this.customerService.updateCustomer(this.data.user.id, obj).subscribe(res =>{
        let obj = {
          user: res,
          city: this.cityAux,
          district: this.districtAux
        }
        
        this.edit.emit(obj)
        this._snackBar.open('Se editó el perfil con éxito!', 'Cerrar', {duration:4000, horizontalPosition:'start'})
        this.dialogRef.close(); 
        this.progress_bar = false;
      })

      
    } else if(this.data.metadata.usertype == 2) {
      let obj = {
        account: {
          id: this.data.metadata.id
        },
        birthday: this.birthdayE.value,
        cellphone: this.cellphoneE.value,
        district: {
          city: {
            id: this.cityAux.id
          },
          id: this.districtAux.id
        },
        dni: this.dniE.value,
        email: this.emailE.value,
        firstName: this.firstnameE.value,
        lastName: this.lastnameE.value,
        specialty: {
          id: this.specialtyAux.id
        }
      }
      
      this.technicianService.updateTechnician(this.data.user.id, obj).subscribe(res =>{
        let obj = {
          user: res,
          city: this.cityAux,
          district: this.districtAux,
          specialty: this.specialtyAux
        }
  
        this.edit.emit(obj);
        this._snackBar.open('Se editó el perfil con éxito!', 'Cerrar', {duration:4000, horizontalPosition:'start'})
        this.dialogRef.close(); 
        this.progress_bar = false;
      })

    }

  }

}
