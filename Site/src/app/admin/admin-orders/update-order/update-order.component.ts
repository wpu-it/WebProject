import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrdersService} from "../../../user/orders/orders.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-order',
  templateUrl: 'update-order.component.html',
  styleUrls: ['update-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UpdateOrderComponent implements OnChanges{
  form: FormGroup;
  @Input() orderId: number;
  errors: string[] = [];
  isConfirmed = true;
  @Output() updateEvent = new EventEmitter();

  constructor(
    private readonly ordersService: OrdersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'consFullname': new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z,a-z, ]+$'),
        Validators.maxLength(50)
      ]),
      'consEmail': new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w.]+[@][A-Za-z]+[.]+[A-Za-z.]+$'),
        Validators.maxLength(50)
      ]),
      'consPhoneNumber': new FormControl('(+380)', [
        Validators.required,
        Validators.pattern('^\\(\\+380\\)\\d{9}$')
      ])
    });
    this.getOrder();
  }

  ngOnChanges(changes: SimpleChanges){
    this.errors = [];
    this.getOrder();
  }

  onCloseClick(){
    this.errors = [];
    this.getOrder();
  }

  getOrder(){
    this.ordersService.getOrderById(this.orderId).subscribe(order => {
      this.form.patchValue({
        consFullname: order.consFullname,
        consEmail: order.consEmail,
        consPhoneNumber: order.consPhoneNumber
      });
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { consFullname, consEmail, consPhoneNumber } = this.form.value;
      this.errors = [];
      this.ordersService.updateOrder(this.orderId, consFullname, consEmail, consPhoneNumber).pipe(
        catchError((err: HttpErrorResponse) => {
          this.isConfirmed = false;
          if(typeof err.error == "string") this.errors.push(err.error);
          else{
            let errors = err.error.errors;
            if(errors.consFullname != undefined){
              errors.consFullname.forEach((err: string) => this.errors.push(err));
            }
            if(errors.consEmail != undefined){
              errors.consEmail.forEach((err: string) => this.errors.push(err));
            }
            if(errors.consPhoneNumber != undefined){
              errors.consPhoneNumber.forEach((err: string) => this.errors.push(err));
            }
          }
          return [];
        }),
        take(1)
      ).subscribe(res => {
        let ref = document.getElementById('popup-2-close');
        ref = ref ? ref : new HTMLElement();
        ref.click();
        this.updateEvent.emit();
      });
    }
  }
}
