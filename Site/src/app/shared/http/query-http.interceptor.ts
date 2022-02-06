import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "../storage/local-storage";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class QueryHttpInterceptor implements HttpInterceptor{
  constructor(
    private readonly router: Router,
    private readonly browserLocalStorage: BrowserLocalStorage
  ){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.router.navigate(['auth']);
          this.browserLocalStorage.removeItem('accessToken');

          return of(err.message);
        }
        return throwError(err);
      })
    );
  }

}
