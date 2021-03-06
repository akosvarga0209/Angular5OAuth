import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      username: user.username,
      password: user.password,
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Basic ZGV2Z2xhbi1jbGllbnQ6cGFzc3dvcmQ=' });
    return this.http.post(this.rootUrl + '/register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password) {
    var data ="grant_type=password&"+"username=" + userName + "&password=" + password;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Authorization':'Basic ZGV2Z2xhbi1jbGllbnQ6cGFzc3dvcmQ=' });
    return this.http.post(this.rootUrl + '/oauth/token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/users/user');
  }

}
