import { HttpClient } from '@angular/common/http';import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';import { login, signUp } from '../data-type';
@Injectable({
  providedIn: 'root'})
export class UserService {  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(user: signUp) {
    this.http.post('http://localhost:8080/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);        }
      });  }
  userLogin(data: login) {
    this.http.get<signUp[]>(`http://localhost:8080/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' })      .subscribe((result) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);        }
    });  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }  }

}
