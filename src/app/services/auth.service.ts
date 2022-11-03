import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private baseURL = 'http://localhost:8080/api/auth/account';
  private baseURL= environment.URL + '/user';

  constructor(private http: HttpClient) { }

  login(user): Observable<any>{
    return this.http.post(`${this.baseURL}/authenticate`, user);
  }


  validateUser(user): Observable<any>{
    return this.http.post(`${this.baseURL}`, user);
  }

  getRegisteredEmails(): Observable<any>{
    return this.http.get(`${this.baseURL}/listallemails`);
  }

  getUserByID(id): Observable<any>{
    return this.http.get(`${this.baseURL}/${id}`)
  }
}
