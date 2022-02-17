import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Order} from "../../../user/orders/orders.interfaces";
import {Router} from "@angular/router";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {Observable, of} from "rxjs";
import {Fantour} from "../../../user/fantours/fantours.interfaces";

@Component({
  selector: 'admin-order',
  templateUrl: 'admin-order.component.html',
  styleUrls: ['admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit{
  @Input() order: Order = { id: 1, consPhoneNumber: '', consFullname: '', consEmail: '', fanTourId: 1};
  @Output() editClick = new EventEmitter();
  @Output() removeClick = new EventEmitter();
  fantour$: Observable<Fantour>;

  constructor(
    private readonly fantoursService: FantoursService
  ) {
  }

  ngOnInit() {

    this.fantoursService.getFantourById(this.order.fanTourId).subscribe(tour => {
      this.fantour$ = of(tour);
    });
  }

  onUpdateClick(){
    this.editClick.emit(this.order.id);
  }

  onRemoveClick(){
    this.removeClick.emit(this.order.id);
  }
}
