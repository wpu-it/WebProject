import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../../../environments/environment.model";
import {ApiOrder} from "../orders/orders-api.interfaces";
import {publishReplay, refCount} from "rxjs/operators";
import {ApiOrdersDiagram} from "./orders-diagram-api.interfaces";


@Injectable()
export class OrdersDiagramApiService{
  constructor(
    private readonly httpClient: HttpClient,
    private readonly env: EnvironmentModel
  ) {
  }

  getOrdersDiagram(){
    return this.httpClient.get<ApiOrdersDiagram[]>([
      this.env.fantoursAPI,
      'charts',
      'get-orders-diagram'
    ].join('/')).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
