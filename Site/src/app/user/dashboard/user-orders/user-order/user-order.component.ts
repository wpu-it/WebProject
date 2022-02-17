import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Order} from "../../../orders/orders.interfaces";
import {OrdersService} from "../../../orders/orders.service";
import {Observable} from "rxjs";
import {Fantour} from "../../../fantours/fantours.interfaces";
import {FantoursService} from "../../../fantours/fantours.service";

@Component({
  selector: 'user-order',
  templateUrl: 'user-order.component.html',
  styleUrls: ['user-order.component.scss']
})
export class UserOrderComponent implements OnInit{
  @Input() order: Order = { id: 1, consPhoneNumber: '', consFullname: '', consEmail: '', fanTourId: 1};
  @Output() updateEvent = new EventEmitter();
  @Output() removeEvent = new EventEmitter();
  fantour$: Observable<Fantour>;

  constructor(
    private readonly fantoursService: FantoursService
  ) {
  }

  onRemoveClick(){
    this.removeEvent.emit(this.order.id);
  }

  onUpdateClick(){
    this.updateEvent.emit(this.order.id);
  }

  ngOnInit(): void {
    this.fantour$ = this.fantoursService.getFantourById(this.order.fanTourId);
  }
}
