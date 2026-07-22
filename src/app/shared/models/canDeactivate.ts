import { Observable } from "rxjs";


export interface IcanDeactivate {
      canDeactivate : () => boolean | Observable<boolean> | Promise<boolean>  
}