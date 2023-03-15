import {Injectable} from "@angular/core";
import {OrdersDiagramApiService} from "../../api/orders-diagram/orders-diagram-api.service";
import {OrdersDiagram} from "./admin-orders-diagram.interfaces";
import {map} from "rxjs/operators";
import {ApiOrdersDiagram} from "../../api/orders-diagram/orders-diagram-api.interfaces";
import {Order} from "../../user/orders/orders.interfaces";
import {Observable} from "rxjs";


@Injectable()
export class AdminOrdersDiagramService{
  ordersDiagram$: Observable<OrdersDiagram[]>;
  constructor(private readonly ordersDiagramApiService: OrdersDiagramApiService) {
    this.ordersDiagram$ = this.ordersDiagramApiService.getOrdersDiagram().pipe(
      map(orders => {
        let res = this.mapOrders(orders);
        return res;
      })
    );
  }

  getOrdersDiagram() : Observable<OrdersDiagram[]>{
    return this.ordersDiagramApiService.getOrdersDiagram().pipe(
      map(orders => {
        let res = this.mapOrders(orders);
        return res;
      })
    );
  }

  mapOrders(orders: ApiOrdersDiagram[]){
    let result: OrdersDiagram[] = [];
    orders.forEach(order => {
      result.push({
        fanTourName: order.fanTourName,
        count: order.count
      });
    });
    return result;
  }
}
