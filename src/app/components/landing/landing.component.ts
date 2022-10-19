import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // iniciarSesion(){
  //   this.router.navigateByUrl('/login');
  // }

  // registrarse(){
  //   this.router.navigateByUrl('/registro');
  // }

}
