import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import * as internal from 'assert';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  //private baseURL = 'http://localhost:8080/api/specialty';
  
  private baseURL= environment.URL + '/specialty';
  private baseURL2= environment.URL;

  constructor(private http: HttpClient) { }


  getSpecialties(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  assignSpecialty(userId: number, specialtyId: number): Observable<any> {
    return this.http.post(`${this.baseURL2}/technician/${userId}/specialties/${specialtyId}`, null);
  }
}
