import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable({
    providedIn: 'root'
})
export class UserRoleGuard implements CanActivate,CanActivateChild {
    private _authService = inject(AuthService)

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       
      let userRoleArr : Array<string> = route.data['userRoles']
      let loggedinUser = this._authService.getUserRole()!
      return userRoleArr.includes(loggedinUser)  
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let userRoleArr : Array<string> = childRoute.data['userRoles']
      let loggedinUser = this._authService.getUserRole()!
      return userRoleArr.includes(loggedinUser)
    }

}