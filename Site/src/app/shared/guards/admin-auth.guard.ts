import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {BrowserLocalStorage} from "../storage/local-storage";
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class AdminAuthGuard implements CanActivate{
  constructor(
     public router: Router,
     public authService: AuthService
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.role != 'admin'){
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }

}
