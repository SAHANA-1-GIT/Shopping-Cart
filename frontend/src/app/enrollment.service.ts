import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import { NewUser } from './new-user';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
//write the url of profile service 
  _loginApi='http://localhost:5000/login';
  _signupApi= 'http://localhost:5000/signup';

  constructor(private _http:HttpClient) { }

  enroll(user:User){
     return this._http.post<any>(this._loginApi, User);

  }

  enrollNewUser(newUser:NewUser){
    return this._http.post<any>(this._signupApi, NewUser);
  }
}
