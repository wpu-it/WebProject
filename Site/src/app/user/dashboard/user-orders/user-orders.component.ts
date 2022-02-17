import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {UsersService} from "../users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {Order} from "../../orders/orders.interfaces";
import {PageEvent} from "@angular/material/paginator";
import {Location} from "@angular/common";
import {OrdersService} from "../../orders/orders.service";

@Component({
  selector: 'user-orders',
  templateUrl: 'user-orders.component.html',
  styleUrls: ['user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit{
  orders$: Observable<Order[]>;
  userId: number;
  orderId: number;

  totalResults: number;
  leftPageIdx: number = 0;
  rightPageIdx: number = 1;
  pageSize: number = 2;

  constructor(
    private readonly usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
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
    this.activatedRoute.params.subscribe((params) => {
      this.userId = Number(params.userId);
      this.getOrders();
    })
  }

  getOrders(){
    this.usersService.getUsersOrders(this.userId).subscribe(ord => {
      this.totalResults = ord.length;
      let result = ord.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.orders$ = of(result);
    });
  }

  onRemoveClick(id: number){
    this.ordersService.removeOrder(id).subscribe(res => {
      document.location.reload();
    });
  }

  onUpdateClick(id: number){
    this.orderId = id;
  }

  changeEvent(){
    this.getOrders();
  }
}
