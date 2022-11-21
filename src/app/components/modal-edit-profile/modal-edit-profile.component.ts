import { Component, OnInit, Inject, Output, EventEmitter  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CityService } from '../../services/city.service';
import { SpecialtyService } from '../../services/specialty.service';
import { TechnicianService } from '../../services/technician.service';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.css']
})
export class ModalEditProfileComponent implements OnInit {

  @Output() edit:any = new EventEmitter();
  editForm: FormGroup;

  progress_bar: boolean = false;

  specialtyAux: any;
  specialties: any;
  selectedSpecialties: number[] = [];
  specialtiesForm = new FormControl([]);

  ID_SPECIALTY: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<ModalEditProfileComponent>,
              private customerService: CustomerService,
              private _snackBar: MatSnackBar,
              private specialtyService: SpecialtyService,
              private technicianService: TechnicianService,
              private addressService: AddressService) { }

  ngOnInit() {
    if(this.data.metadata.userType == "Customer") {
      this.editForm = this._builderForm();
    } else{ 
      this.specialtyService.getSpecialties().subscribe(spe => {
        this.specialties = spe;
      })
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
      region: [this.data.user.userAddress.region, [Validators.required]],
      province: [this.data.user.userAddress.province, [Validators.required]],
      district: [this.data.user.userAddress.district, [Validators.required]],
      street: [this.data.user.userAddress.fullAddress, [Validators.required]],
    }) 
    return form;
  }
  /**Getters */
  get firstnameC() { return this.editForm.controls['firstname']; }
  get lastnameC() { return this.editForm.controls['lastname']; }
  get phoneNumberC() { return this.editForm.controls['phoneNumber']; }
  get imageUrlC() { return this.editForm.controls['imageUrl']}
  get regionC() { return this.editForm.controls['region']}
  get provinceC() { return this.editForm.controls['province']}
  get districtC() { return this.editForm.controls['district']}
  get streetC() { return this.editForm.controls['street']}


  _builderForm2(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    this.data.user.specialties.forEach(spec => {
      this.selectedSpecialties.push(spec.specialty.id);
    });
    let form = this._formBuilder.group({
      firstname: [this.data.user.firstName, [Validators.required, Validators.pattern(pattern)]],
      lastname: [this.data.user.lastName, [Validators.required, Validators.pattern(pattern)]],
      phoneNumber: [this.data.user.phoneNumber, [Validators.required, Validators.pattern(pattern)]],
      description: [this.data.user.description, [Validators.required, Validators.pattern(pattern)]],
      imageUrl: [this.data.user.imageUrl, [Validators.required]],
    });
    this.specialtiesForm = new FormControl(this.selectedSpecialties);
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

  closeModal(){
    this._snackBar.open('Se editó el perfil con éxito!', 'Cerrar', {duration:4000, horizontalPosition:'start'})
    this.dialogRef.close(); 
    this.progress_bar = false;
  }

  validateDifferenceAddress(addressOld: any, addressNew: any){
    if (addressOld.region == addressNew.region &&
      addressOld.province == addressNew.province &&
      addressOld.district == addressNew.district &&
      addressOld.fullAddress == addressNew.fullAddress)
      return true;
    else {
      return false;
    }
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

      let addressObj = {
        region: this.regionC.value,
        province: this.provinceC.value,
        district: this.districtC.value,
        fullAddress: this.streetC.value
      }
      
      this.customerService.updateCustomer(this.data.metadata.id, obj).subscribe(res =>{
        this.edit.emit(res);
        if (this.validateDifferenceAddress(this.data.user.userAddress,addressObj)){
          this.closeModal();
        }else if (this.data.user.userAddress.fullAddress == ""|| this.data.user.userAddress.district == "" || this.data.user.userAddress.province == "" || this.data.user.userAddress.region == ""){
          this.addressService.createAddress(this.data.metadata.id, addressObj).subscribe(res2 =>{
            this.edit.emit(res2);
            this.closeModal();
          })
        }else{
          this.addressService.updateAddress(this.data.metadata.id, addressObj).subscribe(res3 =>{
            this.edit.emit(res3);
            this.closeModal();
          })
        }
      })

      
    } else {
      let obj = {
        phoneNumber: this.phoneNumberE.value,
        firstName: this.firstnameE.value,
        lastName: this.lastnameE.value,
        description: this.descriptionE.value,
        imageUrl: this.imageUrlE.value,
        specialty: this.specialtyAux
      }
      
      this.technicianService.updateTechnician(this.data.metadata.id, obj).subscribe(res =>{
        this.specialtyService.assignSpecialty(this.data.metadata.id, this.specialtyAux).subscribe(result =>{
          let obj = {
            phoneNumber: res.phoneNumber,
            firstName: res.firstName,
            lastName: res.lastName,
            description: res.description,
            imageUrl: res.imageUrl,
            specialty: this.specialtyAux
          }
          this.edit.emit(obj);
          this.closeModal();
        })       
      })

    }

  }

}
