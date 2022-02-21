import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FantoursService} from "../../fantours/fantours.service";
import {OrdersService} from "../orders.service";
import {Observable, of} from "rxjs";
import {Fantour} from "../../fantours/fantours.interfaces";
import {AuthService} from "../../../auth/auth.service";
import {UsersService} from "../../dashboard/users.service";
import {BrowserLocalStorage} from "../../../shared/storage/local-storage";
import {catchError, take} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {PicturesService} from "../../../pictures.service";

@Component({
  selector: 'make-order',
  templateUrl: 'make-order.component.html',
  styleUrls: ['make-order.component.scss']
})
export class MakeOrderComponent{
  form: FormGroup;
  isConfirmed = true;
  disabled = false;
  userEmail = '';
  errors: string[] = [];
  fantourId: number = 1;
  fantour$: Observable<Fantour>;

  errorUrl: string = '';

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly fantoursService: FantoursService,
    private readonly ordersService: OrdersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly localStorage: BrowserLocalStorage,
    private readonly usersService: UsersService,
    private readonly picturesService: PicturesService
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.fantourId = Number(params.tourId);
      this.fantoursService.getFantourById(this.fantourId).pipe(
        catchError(err => {
          if(err.error == 'Tour not found'){
            this.errors.push(err.error);
          }
          return [];
        })
      ).subscribe(fantour => {
        if(fantour.quantity >= 1){
          this.fantour$ = of(fantour);
          let token = this.localStorage.getItem('accessToken');
          this.usersService.getUserByAccessToken(token ? token : '');
          this.usersService.user$.subscribe(user => {
            if(user.id != 0 && !user.isAdmin){
              this.userEmail = user.email;
              this.form.patchValue({
                consFullname: user.fullname,
                consEmail: user.email
              });
              this.form.controls['consEmail'].disable();
            }
          });
        }
        else{
          this.errors.push("Fan tour wasn't found")
        }
      });
    });
    this.picturesService.getPictureByName('Error content').subscribe(res => {
      this.errorUrl = res;
    });
  }



  onConfirmClick(){
    if(this.form.valid){
      const { consFullname, consEmail, consPhoneNumber } = this.form.value;
      let email = consEmail;
      if(consEmail == undefined) email = this.userEmail;
      this.errors = [];
      this.disabled = true;
      this.ordersService.addOrder(consFullname, email, consPhoneNumber, this.fantourId).pipe(
        catchError((err: HttpErrorResponse) => {
          this.isConfirmed = false;
          this.disabled = false;
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
        alert('Success');
        this.router.navigate(['']);
      });
    }
  }

  goToPrevPage(){
    this.location.back();
  }

  goToMainPageClick(){
    this.router.navigate(['/']);
  }
}
