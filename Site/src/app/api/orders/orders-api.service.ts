import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../../../environments/environment.model";
import {ApiOrder} from "./orders-api.interfaces";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable()
export class OrdersApiService{
  constructor(
    private readonly httpClient: HttpClient,
    private readonly env: EnvironmentModel
  ) {
  }

  getAllOrders(){
    return this.httpClient.get<ApiOrder[]>([
      this.env.fantoursAPI,
      'orders',
      'get-all'
    ].join('/')).pipe(
      publishReplay(1),
      refCount()
    );
  }

  getOrderById(id: number){
    return this.httpClient.get<ApiOrder>([
      this.env.fantoursAPI,
      'orders',
      'get'
    ].join('/'),
      {
        params:{
          id: id
        }
      }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  addOrder(consFullname: string, consEmail: string, consPhoneNumber: string, fantourId: number){
    return this.httpClient.post<ApiOrder[]>([
      this.env.fantoursAPI,
      'orders'
    ].join('/'),
      {
        consFullname,
        consEmail,
        consPhoneNumber,
        fantourId
      }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  updateOrder(id: number, consFullname: string, consEmail: string, consPhoneNumber: string){
    return this.httpClient.put<ApiOrder[]>([
      this.env.fantoursAPI,
      'orders'
    ].join('/'),{
      id: id,
      consFullname: consFullname,
      consEmail: consEmail,
      consPhoneNumber: consPhoneNumber
    }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  removeOrder(id: number){
    return this.httpClient.delete<ApiOrder[]>([
      this.env.fantoursAPI,
      'orders',
      id
    ].join('/')).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
