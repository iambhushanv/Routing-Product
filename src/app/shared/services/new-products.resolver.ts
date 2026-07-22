import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductsService } from './products.service';
import { Iproduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class NewProductsResolver implements Resolve<Iproduct | Iproduct[]> {
  private _productService = inject(ProductsService)

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct | Iproduct[]> {
    let productId = route.paramMap.get('id')
    if (productId) {
      return this._productService.fetchProductById(productId)
    } else {
      return this._productService.fetchProduct()
    }
  }
}
