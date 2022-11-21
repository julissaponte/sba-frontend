import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Account } from '../../models/account';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { TechnicianService } from '../../services/technician.service';
import { SpecialtyService } from '../../services/specialty.service';
import { CityService } from '../../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer';
import { Technician } from 'src/app/models/technician';

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
  registeredEmails: any[];

  ID_CREATED: number;
  ID_CITY: number;
  ID_DISTRICT: number;
  ID_SPECIALTY: number;
  ACCOUNT: any;
  newCustomer: Customer;
  newTechnician: Technician;
  customerNew: any;
  technicianNew: any;
  account: Account = { email: '', password: '', typeuser: null };
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  registerForm3: FormGroup;
  firstData: boolean = true;
  genders: Gender[] = [
    { value: 'femenino', viewValue: 'Femenino' },
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'nonBinary', viewValue: 'No Binario' },
    { value: 'nonSpecified', viewValue: 'Prefiero No Decir' },
  ];
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private customerService: CustomerService,
    private technicianService: TechnicianService,
    private specialtyService: SpecialtyService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm1 = this._builderForm();
    this.registerForm2 = this._builderForm2();
    this.registerForm3 = this._builderForm3();

    this.specialtyService.getSpecialties().subscribe(spe => {
      this.specialties = spe;
    })

    this.authService.getRegisteredEmails().subscribe(emails => {
      this.registeredEmails = emails;
    })

  }

  _builderForm() {
    let form = this._formBuilder.group({
      usuario: ['', [Validators.required, Validators.email, this._validarEmail()]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      typeuser: [null, [Validators.required]]
    })
    form.valueChanges.subscribe(() => {
    });
    return form;
  }

  _validarEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.registeredEmails == null || !this.registeredEmails.includes(this.usuario)) {
        return null;
      } else {
        return { emailExistente: true }
      }
    }
  }
  /**Getters */
  get usuario() {
    if (this.registerForm1 != null) {
      return this.registerForm1.controls['usuario'].value;
    } else {
      return "";
    }
  }
  get password() { return this.registerForm1.controls['password']; }
  get email() { return this.registerForm1.controls['email']; }
  get typeuser() { return this.registerForm1.controls['typeuser'] }


  _builderForm2() {
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(pattern)]],
      lastname: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    form.valueChanges.subscribe(() => {
    });
    return form;
  }

  get firstnameC() { return this.registerForm2.controls['firstname']; }
  get lastnameC() { return this.registerForm2.controls['lastname']; }
  get cellphoneC() { return this.registerForm2.controls['cellphone']; }
  get descriptionC() { return this.registerForm2.controls['description']; }


  _builderForm3() {
    let form = this._formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    form.valueChanges.subscribe(() => {
    });
    return form;
  }

  get firstnameE() { return this.registerForm3.controls['firstname']; }
  get lastnameE() { return this.registerForm3.controls['lastname']; }
  get cellphoneE() { return this.registerForm3.controls['cellphone']; }
  get descriptionE() { return this.registerForm3.controls['description']; }


  validarDatos(stepper: MatStepper) {
    this.account.email = this.usuario;
    this.account.password = this.password.value;
    this.account.typeuser = this.typeuser.value;

    let obj = {
      email: this.usuario,
      password: this.password.value,
      usertype: this.typeuser.value == 1 ? "Customer" : "Technician"
    }

    this.authService.validateUser(obj).subscribe(res => {
      this.ACCOUNT = res;
      this.ID_CREATED = res.id;
      let tempLoginObj = {
        email: res.email,
        password: res.password
      }
      this.authService.login(tempLoginObj).subscribe(res=>{
        localStorage.setItem('token', res.token);
        if (!res.msj) {
          this.firstData = false
          stepper.next();
        }
        else {
          this._snackBar.open(res.msj, 'Cerrar', { duration: 4000, horizontalPosition: 'start' })
        }
      });
    })
  }

  selectSpecialty(event) {
    this.ID_SPECIALTY = event.value;
  }
  validarEmail(stepper: MatStepper) {
    if (this.typeuser.value == "1") {
      this.customerNew = {
        phoneNumber: this.cellphoneC.value,
        firstName: this.firstnameC.value,
        lastName: this.lastnameC.value,
        description: this.descriptionC.value,
        imageUrl: "/"
      }
      stepper.next();
    }
    else if (this.typeuser.value == '2') {
      this.technicianNew = {
        phoneNumber: this.cellphoneE.value,
        firstName: this.firstnameE.value,
        lastName: this.lastnameE.value,
        description: this.descriptionE.value,
        imageUrl: "/",
      }
      stepper.next();
    }
  }

  registrarse() {
    if (this.typeuser.value == "1") {
      this.customerService.insertCustomer(this.ID_CREATED, this.customerNew).subscribe(res => {
        localStorage.setItem('metadata', JSON.stringify(this.ACCOUNT));
        console.log(res)
        this.router.navigateByUrl('/home-customer');
      })
    }
    if (this.typeuser.value == "2") {
      this.technicianService.insertTechnician(this.ID_CREATED, this.technicianNew).subscribe(res => {
        localStorage.setItem('metadata', JSON.stringify(this.ACCOUNT));
        console.log(res)
        this.router.navigateByUrl('/home-employee');
        // this.technicianService.assignTechnicianSpecialty(this.ID_CREATED, this.ID_SPECIALTY).subscribe(result =>{
        //   localStorage.setItem('metadata', JSON.stringify(this.ACCOUNT));
        //   console.log(res)
        //   console.log(result)
        //   this.router.navigateByUrl('/home-employee');
        // });
      })
    }
  }

}
