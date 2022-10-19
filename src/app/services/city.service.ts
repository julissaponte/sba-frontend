import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

   
  private baseURL='http://localhost:8080/api/cities';

  private baseURL2='http://localhost:8080/api/districts';

  //private baseURL = 'http://localhost:8080/api/cities';
  //private baseURL2 = 'http://localhost:8080/api/districts';

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  getDistrictsByCity(id): Observable<any> {
    return this.http.get(`${this.baseURL2}/getDistrictsByCity/${id}`);
  }
}
