import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCustomerComponent } from './components/home-customer/home-customer.component';
import { HomeEmployeeComponent } from './components/home-employee/home-employee.component';
import { LandingComponent} from './components/landing/landing.component'
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewCustomersComponent } from './components/view-customers/view-customers.component';
import { ViewEmployeesComponent } from './components/view-employees/view-employees.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeQuestionsComponent } from './home-questions/home-questions.component';
import { HomeRecommendationsComponent } from './home-recommendations/home-recommendations.component';


const routes: Routes = [
  {path: ''             , component: LandingComponent},
  {path: 'login'        , component: LoginComponent},
  {path: 'register'     , component: RegisterComponent},
  {path: 'home-customer', canActivate:[AuthGuard], component: HomeCustomerComponent},
  {path: 'home-employee', canActivate:[AuthGuard], component: HomeEmployeeComponent},
  {path: 'profile'      , canActivate:[AuthGuard], component: ProfileComponent},
  {path: 'customers'    , canActivate:[AuthGuard], component: ViewCustomersComponent},
  {path: 'employees'    , canActivate:[AuthGuard], component: ViewEmployeesComponent},
  {path: 'questions'    , canActivate:[AuthGuard], component: HomeQuestionsComponent},
  {path: 'recommendations'    , canActivate:[AuthGuard], component: HomeRecommendationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
