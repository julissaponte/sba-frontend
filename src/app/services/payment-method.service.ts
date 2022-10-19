import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  //private baseURL = 'http://localhost:8080/api/paymentmethods';
  
  private baseURL='http://localhost:8080/api/paymentmethods';

  constructor(private http: HttpClient) { }

  getAllPaymentMethods(): Observable<any>{
    return this.http.get(`${this.baseURL}`);
  }
}
