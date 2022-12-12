import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) {}

  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true); //to make guard true
        localStorage.setItem('seller', JSON.stringify(result.body)); //storing data on local storage
        this.route.navigate(['seller-home']);
      });
  }
  reloadSeller() {
    //function to load seller-home page if loggedin
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }
  userLogin(data: Login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' } //to get json type response
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length === 1) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          console.warn('login pass');
          this.route.navigate(['seller-home']);
        } else {
          console.warn('login failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
