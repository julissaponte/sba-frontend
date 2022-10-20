import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Account } from '../../models/account';
import { AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInfo: any;
  account: Account = {
    email:'',
    password:'',
    typeuser:null
  };
  loginForm: FormGroup;
  constructor(private _formBuilder : FormBuilder,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
    this.loginForm = this._builderForm();
    
  }


  _builderForm(){
    let pattern = '^[a-zA-Z0-9._@\-]*$';
    let form = this._formBuilder.group({
      usuario: ['', [Validators.required, Validators.pattern(pattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }) 
    form.valueChanges.subscribe(()=>{
 
    });
    return form;
  }
    
     get usuario() { return this.loginForm.controls['usuario']; }
     get password() { return this.loginForm.controls['password']; }

 
  login(){

    let obj = {
      email: this.usuario.value,
      password: this.password.value
    }
    this.authService.login(obj).subscribe(res=>{
      this.userInfo = {
        id: res.id,
        email: res.email,
        userType: res.userType,
      }
      localStorage.setItem('metadata', JSON.stringify(this.userInfo))
      localStorage.setItem('token', res.token)
      if(res.userType == "Customer") {
        this.router.navigateByUrl('/home-customer');
      } else if(res.userType == "Technician") { 
        this.router.navigateByUrl('/home-employee');
      }
      console.log(res);
    })
    console.log(this.account.email, this.account.password)
  }

}
