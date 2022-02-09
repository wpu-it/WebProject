import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {UsersService} from "../users.service";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";
import {Order} from "../../orders/orders.interfaces";

@Component({
  selector: 'user-orders',
  templateUrl: 'user-orders.component.html',
  styleUrls: ['user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit{
  orders$: Observable<Order[]>;
  userId: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = Number(params.userId);
      this.usersService.getUsersOrders(this.userId).pipe(
        tap(ord => {
          this.orders$ = of(ord);
        })
      ).subscribe();
    })
  }
}
