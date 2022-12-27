import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}

  ngOnInit(): void {}
  submit(data: Product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is succesfully added';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000); //to display message for 3 sec.
    });
  }
}
