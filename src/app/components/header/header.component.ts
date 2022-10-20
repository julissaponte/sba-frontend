import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  metadata: any = JSON.parse(localStorage.getItem('metadata'))
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.metadata)
  }

 
  toHomePage(){
    if(this.metadata.usertype == "Customer"){
      this.router.navigateByUrl('/home-customer')
    } else {
      this.router.navigateByUrl('/home-employee')
    }
  }

  logout(){
    localStorage.removeItem('metadata');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
