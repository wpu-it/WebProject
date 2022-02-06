import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class CheckAdminGuard implements CanActivate{
  constructor(
    public router: Router,
    public authService: AuthService
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.role == 'admin'){
      this.router.navigate(['admin']);
      return false;
    }
    return true;
  }
}
