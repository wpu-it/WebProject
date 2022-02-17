import {Component} from "@angular/core";
import {OrdersService} from "../../user/orders/orders.service";
import {Observable, of} from "rxjs";
import {Order} from "../../user/orders/orders.interfaces";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'admin-orders',
  templateUrl: 'admin-orders.component.html',
  styleUrls: ['admin-orders.component.scss']
})
export class AdminOrdersComponent{
  orders$: Observable<Order[]>;

  totalResults: number;
  leftPageIdx: number = 0;
  rightPageIdx: number = 1;
  pageSize: number = 2;

  orderId : number = 1;

  constructor(
    private readonly ordersService: OrdersService
  ) {
  }

  onPaginatorClick(event: PageEvent){
    if(Number(event.previousPageIndex) < event.pageIndex){
      this.leftPageIdx += 2;
      this.rightPageIdx += 2;
    }
    else{
      this.leftPageIdx -= 2;
      this.rightPageIdx -= 2;
    }
    this.getOrders();
  }

  ngOnInit(): void {
    this.getOrders();
  }

  changeEvent(){
    this.getOrders();
  }

  updateEvent(id: number){
    this.orderId = id;
  }

  removeEvent(id: number){
    this.ordersService.removeOrder(id).subscribe(res => {
      document.location.reload();
    });
  }

  getOrders(){
    this.ordersService.orders$.subscribe(orders => {
      console.log(orders);
      this.totalResults = orders.length;
      let result = orders.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.orders$ = of(result);
    });
  }
}
