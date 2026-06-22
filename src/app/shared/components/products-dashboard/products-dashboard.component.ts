import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/product';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit {
  getProductsArr !: Array<Iproduct>
  constructor(
    private productsService : ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchProduct()
  }

  trackByFun(index: number, product : Iproduct){
    return product.pid
  }

  fetchProduct(){
    this.productsService.fetchProduct()
    .subscribe({
      next : data => {
        this.getProductsArr = data
      },
      error : err => {
        console.log(err);     
      }
    })
  }

}
