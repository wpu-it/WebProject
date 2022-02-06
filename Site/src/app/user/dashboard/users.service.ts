import {Injectable} from "@angular/core";
import {UsersApiService} from "../../api/users/users-api.service";
import {User} from "./user.interface";
import {map, switchMap, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Order} from "../interfaces";

@Injectable()
export class UsersService{
  user$: Observable<User>;
  constructor(
    private readonly usersApiService: UsersApiService,
    private readonly router: Router
  ) {
  }

  getUserByAccessToken(accessToken: string){
    if(accessToken == '') this.user$ = of({id: 0, fullname:'',email:'',password:'',photo:'',discount:0,isAdmin:false});
    else{
      this.user$ = this.usersApiService.getUserByAccessToken(accessToken).pipe(
        map(user => {
          let newUser: User = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            discount: user.discount,
            isAdmin: user.isAdmin,
            photo: user.photo
          };
          return user;
        })
      );
    }
  }

  updateUser(user: User){
    return this.usersApiService.updateUser(user).pipe(
      map(us => us),
      tap((us: User) => {
        this.user$ = of(us);
        this.router.navigate(['dashboard']);
      })
    );
  }

  updateUsersPassword(oldPswd: string, newPswd: string, userId: number){
    return this.usersApiService.updateUsersPassword(oldPswd, newPswd, userId).pipe(
      map(us => us),
      tap((us: User) => {
        this.user$ = of(us);
        this.router.navigate(['dashboard']);
      })
    );
  }

  updateUsersPhoto(photo: string, userId: number){
    return this.usersApiService.updateUsersPhoto(photo, userId).pipe(
      map(us => us),
      tap((us: User) => {
        this.user$ = of(us);
        this.router.navigate(['dashboard']);
      })
    );
  }

  getUsersOrders(userId: number): Observable<Order[]>{
    return this.usersApiService.getUsersOrders(userId);
  }
}
