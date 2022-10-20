import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 // private baseURL = 'http://localhost:8080/api/customers';
 
 private baseURL='https://localhost:44321/api/customer';


  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  validateEmail(customer): Observable<any> {
    return this.http.post(`${this.baseURL}/validateEmail`, customer);
  }

  getCustomerById(idAccount): Observable<any> {
    return this.http.get(`${this.baseURL}/${idAccount}`);
  }

  insertCustomer(userId: number, customer): Observable<any> {
    return this.http.post(`${this.baseURL}/${userId}`, customer);
  }

  updateCustomer(id, customer): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, customer);
  }
}
