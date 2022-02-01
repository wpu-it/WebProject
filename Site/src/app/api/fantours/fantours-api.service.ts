import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../../../environments/environment.model";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {Observable} from "rxjs";
import {ApiFantour} from "./fantours-api.interfaces";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable()
export class FantoursApiService{
    constructor(
      private readonly httpClient: HttpClient,
      private readonly env: EnvironmentModel,
      private readonly localStorage: BrowserLocalStorage
    ) {
    }

    getAllFantours(): Observable<ApiFantour[]>{
      return this.httpClient.get<ApiFantour[]>([
        this.env.fantoursAPI,
        'fantours'
      ].join('/'),
        {
          headers: {
            'Authorization': `Bearer ${this.localStorage.getItem('accessToken')}`
          }
        }
        ).pipe(
          publishReplay(1),
          refCount()
      )
    }
}
