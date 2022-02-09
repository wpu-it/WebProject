import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrdersService} from "../../../user/orders/orders.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-order',
  templateUrl: 'update-order.component.html',
  styleUrls: ['update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit{
  form: FormGroup;
  orderId: number;
  disabled = false;
  errors: HttpErrorResponse[] = [];
  isConfirmed = true;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'consFullname': new FormControl('', Validators.required),
      'consEmail': new FormControl('', Validators.required),
      'consPhoneNumber': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.orderId = Number(params.id);
      this.ordersService.getOrderById(this.orderId).subscribe(order => {
        this.form.patchValue({
          consFullname: order.consFullname,
          consEmail: order.consEmail,
          consPhoneNumber: order.consPhoneNumber
        });
      });
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { consFullname, consEmail, consPhoneNumber } = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.ordersService.updateOrder(this.orderId, consFullname, consEmail, consPhoneNumber).pipe(
        catchError((err: HttpErrorResponse) => {
          this.isConfirmed = false;
          this.disabled = false;
          if(!this.errors.includes(err.error)){
            this.errors.push(err.error);
          }
          return [];
        }),
        take(1)
      ).subscribe(res => {
        this.router.navigate(['admin/orders']);
      });
    }
  }

  onCloseClick(){
    this.router.navigate(['admin/orders']);
    window.scroll(0, 0);
  }
}
