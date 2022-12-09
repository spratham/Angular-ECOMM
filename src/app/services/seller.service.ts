import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private route: Router) {}

  userSignUp(data: SignUp) {
    let result = this.http
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
}
