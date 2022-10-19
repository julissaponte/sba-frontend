import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 // private baseURL = 'http://localhost:8080/api/customers';
 
 private baseURL='http://localhost:8080/api/customers';


  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  validateEmail(customer): Observable<any> {
    return this.http.post(`${this.baseURL}/validateEmail`, customer);
  }

  getCustomerByIdAccount(idAccount): Observable<any> {
    return this.http.get(`${this.baseURL}/searchByIdAccount/${idAccount}`);
  }

  insertCustomer(customer): Observable<any> {
    return this.http.post(`${this.baseURL}`, customer);
  }

  updateCustomer(id, customer): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, customer);
  }
}
