import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-fantour',
  templateUrl: 'update-fantour.component.html',
  styleUrls: ['update-fantour.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UpdateFantourComponent implements OnChanges{
  form: FormGroup;
  errors: string[] = [];
  isConfirmed = true;
  disabled = false;
  @Input() tourId: number;
  @Output() updateEvent = new EventEmitter();

  constructor(
    private readonly fantoursService: FantoursService
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])[^\\>]*'),
        Validators.maxLength(100)
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])[^\\>]*'),
        Validators.maxLength(500)
      ]),
      'schedule': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])[^\\>]*'),
        Validators.maxLength(500)
      ]),
      'priceWithoutTicket': new FormControl('', [
        Validators.required,
        Validators.pattern('\\b(\\d+(?:\\.(?:[^0]\\d|\\d[^0]))?)\\b')
      ]),
      'ticketPrice': new FormControl('', [
        Validators.required,
        Validators.pattern('\\b(\\d+(?:\\.(?:[^0]\\d|\\d[^0]))?)\\b')
      ]),
      'quantity': new FormControl('', [
        Validators.required,
        Validators.min(1)
      ])
    });
    this.getFantour();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errors = [];
    this.disabled = false;
    this.getFantour();
  }

  onCloseClick(){
    this.errors = [];
    this.getFantour();
  }

  getFantour(){
    this.fantoursService.getFantourById(this.tourId).subscribe(tour => {
      this.form.patchValue({
        title: tour.title,
        description: tour.description,
        schedule: tour.schedule,
        priceWithoutTicket: tour.priceWithoutTicket,
        ticketPrice: tour.ticketPrice,
        quantity: tour.quantity
      });
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { title, description, schedule, priceWithoutTicket, ticketPrice, quantity} = this.form.value;
      this.errors = [];
      this.disabled = true;
      if(typeof priceWithoutTicket == 'string'){
        if(!priceWithoutTicket.match('\\b(\\d+(?:\\.(?:[^0]\\d|\\d[^0]))?)\\b')){
          this.isConfirmed = false;
          this.errors.push('Price without ticket must be in format "digits" or digits.digits');
        }
      }
      if(typeof ticketPrice == 'string'){
        if(!ticketPrice.match('\\b(\\d+(?:\\.(?:[^0]\\d|\\d[^0]))?)\\b')){
          this.isConfirmed = false;
          this.errors.push('Ticket price must be in format "digits" or digits.digits');
        }
      }
      if(isNaN(parseInt(quantity))){
        this.isConfirmed = false;
        this.errors.push('Wrong quantity');
      }
      if(this.errors.length == 0){
        this.fantoursService.updateFantour(this.tourId, title, description, schedule, priceWithoutTicket, ticketPrice, quantity).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isConfirmed = false;
            this.disabled = false;
            if(!this.errors.includes(err.error)){
              if(typeof err.error == "string") this.errors.push(err.error);
              else{
                let errors = err.error.errors;
                if(errors.title != undefined){
                  errors.title.forEach((err: string) => this.errors.push(err));
                }
                if(errors.description != undefined){
                  errors.description.forEach((err: string) => this.errors.push(err));
                }
                if(errors.schedule != undefined){
                  errors.schedule.forEach((err: string) => this.errors.push(err));
                }
                if(errors.priceWithoutTicket != undefined){
                  errors.priceWithoutTicket.forEach((err: string) => this.errors.push(err));
                }
                if(errors.ticketPrice != undefined){
                  errors.ticketPrice.forEach((err: string) => this.errors.push(err));
                }
                if(errors.quantity != undefined){
                  errors.quantity.forEach((err: string) => this.errors.push(err));
                }
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
}
