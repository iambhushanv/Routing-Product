import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Iproduct } from "../models/product";
import { inject, Injectable } from "@angular/core";
import { ProductsService } from "./products.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class productsResolver implements Resolve<Iproduct[]>{
    private _productService = inject(ProductsService)

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct[]> {
        return this._productService.fetchProduct()
    }
}