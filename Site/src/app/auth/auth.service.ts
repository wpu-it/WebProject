import {Injectable} from "@angular/core";
import {AuthApiService} from "../api/auth/auth-api.service";
import {BrowserLocalStorage} from "../shared/storage/local-storage";
import {Router} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {JwtResponse} from "../api/auth/auth-api.interfaces";
import {Observable, of} from "rxjs";
import {UsersService} from "../user/dashboard/users.service";
import {waitForAsync} from "@angular/core/testing";

@Injectable()
export class AuthService{
  role: string = '';
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly localStorage: BrowserLocalStorage,
    private readonly router: Router,
    private readonly usersService: UsersService
  ) {
    if(this.role == ''){
      if(this.isAuthenticated()){
        let token = localStorage.getItem('accessToken');
        usersService.getUserByAccessToken(token ? token : '');
        usersService.user$.subscribe(u => {
          this.role = u.isAdmin ? 'admin' : 'user';
          if(this.role == 'admin') this.router.navigate(['admin']);
        });
      }
    }
  }

  login(email: string, password: string) : Observable<JwtResponse>{
      return this.authApiService.login(email, password).pipe(
        map(jwtResponse => jwtResponse),
        tap((jwtResponse: JwtResponse) => {
          this.role = jwtResponse.role
          this.localStorage.setItem('accessToken', jwtResponse.accessToken);
          if(jwtResponse.role == 'admin'){
            this.router.navigate(['/admin']);
          }
          else{
            this.router.navigate(['/']);
          }
        })
      );

  }

  register(fullname: string, email: string, password: string, photo: string){
    return this.authApiService.register(fullname, email, password, photo).pipe(
      map(jwtResponse => jwtResponse),
      tap((jwtResponse: JwtResponse) => {
        this.role = jwtResponse.role;
        this.localStorage.setItem('accessToken', jwtResponse.accessToken);
        this.router.navigate(['/']);
      })
    );
  }

  isAuthenticated() : boolean{
    return !!this.localStorage.getItem('accessToken');
  }
}
