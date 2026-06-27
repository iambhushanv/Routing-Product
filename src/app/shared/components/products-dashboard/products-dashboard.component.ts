import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit {
  getProductsArr !: Array<Iproduct>
  constructor(
    private productsService : ProductsService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.fetchProduct()
    console.log('current url:', this._router.url); 
  }

  trackByFun(index: number, product : Iproduct){
    return product.pid
  }

  fetchProduct(){
    this.productsService.fetchProduct()
    .subscribe({
      next : data => {
        this.getProductsArr = data
        if(this.getProductsArr.length > 0){
          this._router.navigate(['/products', this.getProductsArr[0].pid],
           { queryParams: { cr: this.getProductsArr[0].canReturn } })
        }
      },
      error : err => {
        console.log(err);     
      }
    })
  }

}
