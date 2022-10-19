import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
// import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL2 = 'http://localhost:8080/api/employees';

  private baseURL='http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any>{
    return this.http.get(`${this.baseURL}`);
  }

  insertEmployee(employee): Observable<any> {
    return this.http.post(`${this.baseURL}`, employee)
  }

  getEmployeeByID(id:number): Observable<any>{
    return this.http.get(`${this.baseURL}/${id}`);
  }

  getEmployeeByIdAccount(idAccount): Observable<any> {
    return this.http.get(`${this.baseURL}/searchByAccountId/${idAccount}`);
  }

  getEmployeesByGender(gender): Observable<any> {
    return this.http.get(`${this.baseURL2}/searchByGender/${gender}`);
  }

  validateEmail(employee): Observable<any> {
    return this.http.post(`${this.baseURL}/validateEmail`, employee);
  }

  updateEmployee(id, employee): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, employee);
  }
}
