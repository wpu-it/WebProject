import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../environments/environment.model";
import {Observable} from "rxjs";
import {Picture} from "./picture.interface";
import {map} from "rxjs/operators";

@Injectable()
export class PicturesService{
  constructor(
    private readonly http: HttpClient,
    private readonly env: EnvironmentModel
  ) {
  }

  getPictureByName(name: string) : Observable<string>{
    return this.http.get<Picture>([
      this.env.fantoursAPI,
      'pictures'
    ].join('/'),
      {
        params:{
          name: name
        }
      }).pipe(
        map(pic => {
          return pic.url;
        })
    );
  }
}
