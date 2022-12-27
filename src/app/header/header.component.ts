import { SellerService } from './../services/seller.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private route: Router, private seller: SellerService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url);

        //if seller logged in then inside else outside
        if (localStorage.getItem('seller') && val.url.includes('seller')) {

          // console.warn('in seller area');
          this.menuType = 'seller';

          //to get the seller name form localStorage
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          // console.warn('outside seller');
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['']);

    alert('user loggedout');
  }
}
