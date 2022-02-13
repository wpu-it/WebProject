import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../user.interface";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {catchError, take} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'change-email',
  templateUrl: 'change-email.component.html',
  styleUrls: ['change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit{
  errors: string[] = [];
  isConfirmed = true;
  form: FormGroup;
  user: User;
  disabled = false;
  prevEmail = '';
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w.]+[@][A-Za-z]+[.]+[A-Za-z.]+$'),
        Validators.maxLength(50)
      ])
    });
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe(us => {
      this.prevEmail = us.email;
      this.user = {
        id: us.id,
        fullname: us.fullname,
        email: us.email,
        password: us.password,
        discount: us.discount,
        isAdmin: us.isAdmin,
        photo: us.photo
      };
      this.form.patchValue({
        email: us.email
      });
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { email } = this.form.value;
      this.errors = [];
      if(email != this.prevEmail){
        this.disabled = true;
        this.user.email = email;
        this.usersService.updateUser(this.user).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isConfirmed = false;
            this.disabled = false;
            if(!this.errors.includes(err.error)){
              if(typeof err.error == "string") this.errors.push(err.error);
              else{
                let errors = err.error.errors;
                if(errors.email != undefined){
                  errors.email.forEach((err: string) => this.errors.push(err));
                }
              }
            }
            return [];
          }),
          take(1)
        ).subscribe();
      }
    }
  }

  onCloseClick(){
    this.router.navigate(['dashboard']);
  }
}
