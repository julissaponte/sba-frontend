import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
// import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  private baseURL2 = 'https://localhost:44321/api/technician';

  private baseURL='https://localhost:44321/api/technician';

  constructor(private http: HttpClient) { }

  getAllTechnicians(): Observable<any>{
    return this.http.get(`${this.baseURL}`);
  }

  insertTechnician(userId: number, technician): Observable<any> {
    return this.http.post(`${this.baseURL}/${userId}`, technician)
  }

  assignTechnicianSpecialty(userId: number, specialtyId: number): Observable<any> {
    return this.http.post(`${this.baseURL}/${userId}/specialties/${specialtyId}`,"")
  }

  getTechnicianById(id:number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  getTechniciansByGender(gender): Observable<any> {
    return this.http.get(`${this.baseURL2}/searchByGender/${gender}`);
  }

  validateEmail(technician): Observable<any> {
    return this.http.post(`${this.baseURL}/validateEmail`, technician);
  }

  updateTechnician(id, technician): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, technician);
  }
}
