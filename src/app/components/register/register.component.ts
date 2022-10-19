import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Account } from '../../models/account';
import { MatStepper } from '@angular/material/stepper';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { SpecialtyService } from '../../services/specialty.service';
import { CityService } from '../../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  cities: any[];
  districts: any[];
  specialties: any[];

  ID_CREATED: number;
  ID_CITY: number;
  ID_DISTRICT: number;
  ID_SPECIALTY: number;
  ACCOUNT: any;
  customerNew: any;
  employeeNew: any;
  account: Account = {username:'', password:'', typeuser:null};
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  registerForm3: FormGroup;
  firstData: boolean = true;
  genders: Gender[] = [
    {value: 'femenino', viewValue: 'Femenino'},
    {value: 'masculino', viewValue: 'Masculino'},
  ];
  constructor(private _formBuilder : FormBuilder,
              private router: Router,
              private authService: AuthService,
              private customerService: CustomerService,
              private employeeService: EmployeeService,
              private cityService: CityService,
              private specialtyService: SpecialtyService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm1 = this._builderForm();
    this.registerForm2 = this._builderForm2();
    this.registerForm3 = this._builderForm3();
    this.cityService.getCities().subscribe(cities =>{
      this.cities = cities;
    })

    this.specialtyService.getSpecialties().subscribe(spe=>{
      this.specialties = spe;
    })

  }

  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      usuario: ['', [Validators.required, Validators.pattern(pattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      typeuser: [null, [Validators.required]]
    })
    form.valueChanges.subscribe(()=>{
    });
    return form;
  }
   /**Getters */
   get usuario() { return this.registerForm1.controls['usuario']; }
   get password() { return this.registerForm1.controls['password']; }
   get email() { return this.registerForm1.controls['email'];}
   get typeuser(){ return this.registerForm1.controls['typeuser']}


  _builderForm2(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(pattern)]],
      lastname: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
    })
    form.valueChanges.subscribe(()=>{
    });
    return form;
  }

  get firstnameC() { return this.registerForm2.controls['firstname']; }
  get lastnameC() { return this.registerForm2.controls['lastname']; }
  get dniC() { return this.registerForm2.controls['dni']; }
  get emailC() { return this.registerForm2.controls['email']; }
  get cellphoneC() { return this.registerForm2.controls['cellphone']; }
  get cityC() { return this.registerForm2.controls['city']; }
  get districtC() { return this.registerForm2.controls['district']; }


  _builderForm3(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(pattern)]],
      lastname: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]]
    })
    form.valueChanges.subscribe(()=>{
    });
    return form;
  }

  get firstnameE() { return this.registerForm3.controls['firstname']; }
  get lastnameE() { return this.registerForm3.controls['lastname']; }
  get dniE() { return this.registerForm3.controls['dni']; }
  get emailE() { return this.registerForm3.controls['email']; }
  get cellphoneE() { return this.registerForm3.controls['cellphone']; }
  get cityE() { return this.registerForm3.controls['city']; }
  get districtE() { return this.registerForm3.controls['district']; }
  get gender() { return this.registerForm3.controls['gender']; }


  validarDatos(stepper: MatStepper){
    this.account.username = this.usuario.value;
    this.account.password = this.password.value;
    this.account.typeuser = this.typeuser.value;

    let obj = {
      username: this.usuario.value,
      password : this.password.value,
      usertype: this.typeuser.value
    }

    this.authService.validateUser(obj).subscribe(res=>{
      this.ACCOUNT = res;
      this.ID_CREATED = res.id;
      if(!res.msj) {
        this.firstData = false
        stepper.next();
      }
      else{

        this._snackBar.open(res.msj, 'Cerrar', {duration:4000, horizontalPosition:'start'})
      }
    })

  }

  selectCity(event){
    this.cityService.getDistrictsByCity(event.value).subscribe(res=>{
      this.districts = res;
    })
  }
  selectSpecialty(event) {
    this.ID_SPECIALTY = event.value;
  }
  validarEmail(stepper: MatStepper){
    if(this.typeuser.value == "1"){
      this.customerNew = {
        account: {
          id: this.ID_CREATED,
        },
        cellphone: this.cellphoneC.value,
        district: {
          city: {
            id: this.cityC.value,
          },
          id: this.districtC.value
        },
        dni: this.dniC.value,
        email: this.emailC.value,
        firstName: this.firstnameC.value,
        lastName: this.lastnameC.value
      }
      this.customerService.validateEmail(this.customerNew).subscribe(res=>{
        if(!res || !res.msj){
          stepper.next()
        } else{
          this._snackBar.open(res.msj, 'Cerrar', {duration:4000, horizontalPosition: 'start'});
        }
      })
      console.log(this.registerForm2.value)
    }
    else if(this.typeuser.value == '2') {
      this.employeeNew = {
        account: {
          id: this.ID_CREATED,
        },
        birthday: this.gender.value,
        cellphone: this.cellphoneE.value,
        district: {
          city: {
            id: this.cityE.value,
          },
          id: this.districtE.value
        },
        dni: this.dniE.value,
        email: this.emailE.value,
        firstName: this.firstnameE.value,
        lastName: this.lastnameE.value,
        specialty: {
          id: this.ID_SPECIALTY
        }
      }
      console.log(this.employeeNew)
      this.employeeService.validateEmail(this.employeeNew).subscribe(res =>{
        console.log(res)
        if(!res || !res.msj){
          stepper.next()
        } else{
          this._snackBar.open(res.msj, 'Cerrar', {duration:4000, horizontalPosition: 'start'});
        }
      })
    }
  }

  registrarse(){
    if(this.typeuser.value == "1"){
      this.customerService.insertCustomer(this.customerNew).subscribe(res =>{
        res.account.usertype = 1;

        localStorage.setItem('metadata', JSON.stringify(this.ACCOUNT));
        console.log(res)
        this.router.navigateByUrl('/home-customer');
      })
    }
    if(this.typeuser.value == "2") {
      this.employeeService.insertEmployee(this.employeeNew).subscribe(res =>{
        res.account.usertype = 2;
        localStorage.setItem('metadata', JSON.stringify(this.ACCOUNT));
        console.log(res)
        this.router.navigateByUrl('/home-employee');
      })
    }
  }

}
