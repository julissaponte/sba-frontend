import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  //private baseURL = 'http://localhost:8080/api/specialty';
  
  private baseURL= environment.URL + '/specialty';

  constructor(private http: HttpClient) { }


  getSpecialties(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }
}
