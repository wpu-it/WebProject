import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, min, take} from "rxjs/operators";

@Component({
  selector: 'add-fantour',
  templateUrl: 'add-fantour.component.html',
  styleUrls: ['add-fantour.component.scss']
})
export class AddFantourComponent{
  form: FormGroup;
  errors: string[] = [];
  isConfirmed = true;
  @Output() addEvent = new EventEmitter();

  constructor(
    private readonly fantoursService: FantoursService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*'),
        Validators.maxLength(100)
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*'),
        Validators.maxLength(500)
      ]),
      'schedule': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*'),
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
      'photo': new FormControl(null, Validators.required),
      'quantity': new FormControl('', [
        Validators.required,
        Validators.min(1)
      ])
    });
    window.scroll(0, 0);
  }

  onAddClick(){
    if(this.form.valid){
      const { title, description, schedule, priceWithoutTicket, ticketPrice, photo, quantity} = this.form.value;
      this.errors = [];
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
        this.errors.push('Quantity is required');
      }
      if(this.errors.length == 0){
        this.fantoursService.addFantour(title, description, schedule, priceWithoutTicket, ticketPrice, photo, quantity).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isConfirmed = false;
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
                if(errors.photo != undefined){
                  errors.photo.forEach((err: string) => this.errors.push(err));
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
          let ref = document.getElementById('popup-close');
          ref = ref ? ref : new HTMLElement();
          ref.click();
          this.addEvent.emit();
        });
      }
    }
  }

  onCloseClick(){
    this.form.patchValue({
      title: '',
      description: '',
      schedule: '',
      priceWithoutTicket: '',
      ticketPrice: '',
      quantity: 1
    })
  }

  onPhotoChange(event: any){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          photo: reader.result
        });
      }
    }
  }
}
