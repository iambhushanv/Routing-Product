import { inject, Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouteReuseStrategy, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    private _authService = inject(AuthService);
    private _router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean | UrlTree {

        if (!!this._authService.getToken()) {
            return true
        } else {
            return this._router.createUrlTree([''])
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean | UrlTree {

        if (!!this._authService.getToken()) {
            return true
        } else {
            return this._router.createUrlTree([''])
        }

    }



}