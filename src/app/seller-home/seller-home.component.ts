import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss'],
})
export class SellerHomeComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'color',
    'category',
    'price',
    'image',
    'description',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productList: undefined | Product[];
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    return this.product.productList().subscribe({
      next: (result) => {
        console.warn(result);
        this.productList = result;
        this.dataSource = new MatTableDataSource(result.reverse()); //putting response in our table datascource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the Products');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
