import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseURL= environment.URL + '/address';
  constructor(private http: HttpClient) { }

  createAddress(id, address): Observable<any> {
    return this.http.post(`${this.baseURL}/${id}`, address);
  }

  updateAddress(id, address): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, address);
  }
}
