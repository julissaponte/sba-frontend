import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  
  private baseURL='https://localhost:44321/api/appointment';

  //private baseURL = 'http://localhost:8080/api/appointments';
  constructor(private http: HttpClient) { }

  insertAppointment(appo): Observable<any> {
    return this.http.post(`${this.baseURL}`, appo);
  }
  getAppointmentByTechnicianId(id: number): Observable<any>{
    return this.http.get(`${this.baseURL}/getappointmentsbytechnicianid/${id}`);
  }

  getAppointmentByCustomerId(id: number): Observable<any>{
    return this.http.get(`${this.baseURL}/getappointmentsbycustomerid/${id}`)
  }
}
