import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {OrdersService} from "../../../orders/orders.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, take} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'update-user-order',
  templateUrl: 'update-user-order.component.html',
  styleUrls: ['update-user-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UpdateUserOrderComponent implements OnChanges{
  errors: string[] = [];
  isConfirmed = true;
  @Input() orderId: number;
  @Output() updateEvent = new EventEmitter();
  form: FormGroup;

  constructor(
    private readonly ordersService: OrdersService
  ) {
    this.form = new FormGroup({
      'consFullname': new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z,a-z, ]+$'),
        Validators.maxLength(50)
      ]),
      'consPhoneNumber': new FormControl('(+380)', [
        Validators.required,
        Validators.pattern('^\\(\\+380\\)\\d{9}$')
      ])
    });
    this.getOrder();
  }

  getOrder(){
    this.ordersService.getOrderById(this.orderId).subscribe(order => {
      this.form.patchValue({
        consFullname: order.consFullname,
        consPhoneNumber: order.consPhoneNumber
      });
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { consFullname, consPhoneNumber } = this.form.value;
      this.errors = [];
      this.ordersService.updateOrder(this.orderId, consFullname, consPhoneNumber).pipe(
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
        alert('Success');
      });
    }
  }

  onCloseClick(){
    this.errors = [];
    this.getOrder();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errors = [];
    this.getOrder();
  }
}
