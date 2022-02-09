import {Component, Input} from "@angular/core";
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
export class AdminOrderComponent{
  @Input() order: Order = {id: 0, consFullname: '',consEmail: '',consPhoneNumber: '', fanTourId: 0};
  fantour$: Observable<Fantour>;

  constructor(
    private readonly router: Router,
    private readonly fantoursService: FantoursService
  ) {
    this.fantoursService.getFantourById(this.order.fanTourId).subscribe(tour => {
      this.fantour$ = of(tour);
    });
  }

  onUpdateClick(){
    this.router.navigate(['admin/orders/edit/' + this.order.id]);
  }

  onRemoveClick(){
    this.router.navigate(['admin/orders/remove/' + this.order.id]);
  }

  onMakeCompletedClick(){
    this.router.navigate(['admin/orders/complete/' + this.order.id]);
  }
}
