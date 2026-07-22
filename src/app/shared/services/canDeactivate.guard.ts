import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ProductFormComponent } from "../components/products-dashboard/product-form/product-form.component";
import { Injectable } from "@angular/core";
import { IcanDeactivate } from "../models/canDeactivate";

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<IcanDeactivate> {

    canDeactivate(component: IcanDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate();
    }
}