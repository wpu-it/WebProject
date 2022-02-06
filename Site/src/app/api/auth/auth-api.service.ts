import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../../../environments/environment.model";
import {Observable} from "rxjs";
import {JwtResponse} from "./auth-api.interfaces";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable()
export class AuthApiService{
  constructor(
    private readonly httpClient: HttpClient,
    private readonly appEnv: EnvironmentModel
  ) {
  }

  login(email: string, password: string) : Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>([
      this.appEnv.fantoursAPI,
      'auth',
      'login'
    ].join('/'),
      {
        email,
        password
      }
        ).pipe(
        publishReplay(1),
        refCount()
      );
  }

  register(fullname: string, email: string, password: string, photo: string): Observable<JwtResponse>{
      return this.httpClient.post<JwtResponse>([
        this.appEnv.fantoursAPI,
        'auth',
        'register'
      ].join('/'),
        {
          fullname,
          email,
          password,
          photo
        },
        {
          headers:{
            'Authorization': 'Bearer token'
          }
        }).pipe(
            publishReplay(1),
            refCount()
      );
  }
}
