import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Order} from "./orders.interfaces";
import {OrdersApiService} from "../../api/orders/orders-api.service";
import {Router} from "@angular/router";
import {ApiOrder} from "../../api/orders/orders-api.interfaces";
import {map, tap} from "rxjs/operators";

@Injectable()
export class OrdersService{
  orders$: Observable<Order[]>;

  constructor(
    private readonly ordersApiService: OrdersApiService,
    private readonly router: Router
  ) {
    this.orders$ = this.ordersApiService.getAllOrders().pipe(
      map(order => {
        let res = this.mapOrders(order);
        return res;
      })
    );
  }

  getOrderById(id: number){
    return this.ordersApiService.getOrderById(id).pipe(
      map(order => {
        return this.mapOrder(order);
      })
    );
  }

  addOrder(consFullname: string, consEmail: string, consPhoneNumber: string, fantourId: number){
    return this.ordersApiService.addOrder(consFullname, consEmail, consPhoneNumber, fantourId).pipe(
      map(orders => {
        return this.mapOrders(orders);
      }),
      tap(orders => {
        this.orders$ = of(orders);
        this.router.navigate(['admin/orders']);
        window.scroll(0, 0);
      })
    );
  }

  updateOrder(id: number, consFullname: string, consEmail: string, consPhoneNumber: string){
    return this.ordersApiService.updateOrder(id, consFullname, consEmail, consPhoneNumber).pipe(
      map(orders => {
        return this.mapOrders(orders);
      }),
      tap(orders => {
        this.orders$ = of(orders);
        this.router.navigate(['admin/orders']);
        window.scroll(0, 0);
      })
    );
  }

  removeOrder(id: number){
    return this.ordersApiService.removeOrder(id).pipe(
      map(orders => {
        return this.mapOrders(orders);
      }),
      tap(orders => {
        this.orders$ = of(orders);
        this.router.navigate(['admin/orders']);
        window.scroll(0, 0);
      })
    );
  }

  mapOrders(orders: ApiOrder[]){
    let result: Order[] = [];
    orders.forEach(order => {
      result.push({
        id: order.id,
        consFullname: order.consFullname,
        consEmail: order.consEmail,
        consPhoneNumber: order.consPhoneNumber,
        fanTourId: order.fanTourId
      });
    });
    return result;
  }

  mapOrder(order: ApiOrder){
    let result: Order = {
      id: order.id,
      consFullname: order.consFullname,
      consEmail: order.consEmail,
      consPhoneNumber: order.consPhoneNumber,
      fanTourId: order.fanTourId
    };
    return result;
  }

}
