import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin = false;
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: SignUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: Login): void {
    console.warn(data);
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
