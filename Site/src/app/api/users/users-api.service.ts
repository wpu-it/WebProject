import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../../../environments/environment.model";
import {Observable} from "rxjs";
import {ApiUser} from "./users-api.interfaces";
import {publishReplay, refCount} from "rxjs/operators";
import {User} from "../../user/dashboard/user.interface";
import {ApiOrder} from "../orders/orders-api.interfaces";
import {JwtResponse} from "../auth/auth-api.interfaces";

@Injectable()
export class UsersApiService{
  constructor(
    private readonly httpClient: HttpClient,
    private readonly env: EnvironmentModel
  ) {
  }

  getUserByAccessToken(accessToken: string) : Observable<ApiUser>{
    return this.httpClient.get<ApiUser>([
      this.env.fantoursAPI,
      'users',
      'get-by-token'
    ].join('/'),
      {
        params: {
          accessToken: accessToken
        }
      }).pipe(
        publishReplay(1),
        refCount()
    );
  }

  updateUser(user: User) : Observable<ApiUser>{
    return this.httpClient.put<ApiUser>([
      this.env.fantoursAPI,
      'users',
      'update'
    ].join('/'),
      {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        discount: user.discount,
        isAdmin: user.isAdmin
      }).pipe(
        publishReplay(1),
        refCount()
    );
  }

  updateUsersPassword(oldPswd: string, newPswd: string, userId: number) : Observable<ApiUser>{
    return this.httpClient.put<ApiUser>([
      this.env.fantoursAPI,
      'users',
      'update',
      'password'
    ].join('/'),
      {
        oldPassword: oldPswd,
        newPassword: newPswd,
        userId: userId
      }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  updateUserEmail(user: User){
    return this.httpClient.put<JwtResponse>([
      this.env.fantoursAPI,
      'users',
      'update',
      'email'
    ].join('/'),
      {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        discount: user.discount,
        isAdmin: user.isAdmin
      }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  updateUsersPhoto(photo: string, userId: number): Observable<ApiUser>{
    return this.httpClient.put<ApiUser>([
      this.env.fantoursAPI,
      'users',
      'update',
      'photo'
    ].join('/'),
      {
        newPhoto: photo,
        userId: userId
      }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  getUsersOrders(userId: number): Observable<ApiOrder[]>{
    return this.httpClient.get<ApiOrder[]>([
      this.env.fantoursAPI,
      'users',
      'get-orders'
    ].join('/'), {
      params: {
        userId: userId
      }
    }).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
