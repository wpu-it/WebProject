import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, take} from "rxjs/operators";
import {Fantour} from "../../../user/fantours/fantours.interfaces";

@Component({
  selector: 'update-fantour',
  templateUrl: 'update-fantour.component.html',
  styleUrls: ['update-fantour.component.scss']
})
export class UpdateFantourComponent implements OnInit{
  form: FormGroup;
  disabled = false;
  errors: HttpErrorResponse[] = [];
  isConfirmed = true;
  tourId: number;

  constructor(
    private readonly fantoursService: FantoursService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'schedule': new FormControl('', Validators.required),
      'priceWithoutTicket': new FormControl('', Validators.required),
      'ticketPrice': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.tourId = Number(params.id);
      this.fantoursService.getFantourById(this.tourId).subscribe(tour => {
        this.form.patchValue({
          title: tour.title,
          description: tour.description,
          schedule: tour.schedule,
          priceWithoutTicket: tour.priceWithoutTicket,
          ticketPrice: tour.ticketPrice,
          quantity: tour.quantity
        });
      })
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { title, description, schedule, priceWithoutTicket, ticketPrice, quantity} = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.fantoursService.updateFantour(this.tourId, title, description, schedule,
        priceWithoutTicket, ticketPrice, quantity).pipe(
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
        this.router.navigate(['admin/fantours']);
      });
    }
  }

  onCloseClick(){
    this.router.navigate(['admin/fantours']);
    window.scroll(0, 0);
  }
}
