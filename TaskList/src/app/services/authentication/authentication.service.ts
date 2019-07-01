import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../model/users/user';
import { map } from 'rxjs/internal/operators/map';
import { HttpClientHelper } from '../../helpers/http-client-helper';
import { LoginModel } from 'src/app/model/login/loginmodel';
import { LoginResponse } from 'src/app/model/login/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;

  constructor(
    private http: HttpClientHelper) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(username: string, password: string) {
  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  login(loginModel: LoginModel) {

    return this.http.post<LoginResponse>('employees/login', loginModel)
      .pipe(map(loginResponse => {

        if (loginResponse && loginResponse.token) {
          localStorage.setItem('currentUser', JSON.stringify(loginResponse));
          this.currentUserSubject.next(loginResponse);
        }

        return loginResponse;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
