import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../users.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../user.interface";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  form: FormGroup
  disabled = false;
  errors: string[] = [];
  isConfirmed = true;
  userId: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'oldPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}'),
        Validators.maxLength(50)
      ]),
      'confirmNewPassword': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe(us => {
      this.userId = us.id;
    })
  }

  onEditClick(){
    if(this.form.valid){
      this.errors = [];
      const { oldPassword, newPassword, confirmNewPassword } = this.form.value;
      if(newPassword == confirmNewPassword){
        this.disabled = true;
        this.usersService.updateUsersPassword(oldPassword, newPassword, this.userId).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isConfirmed = false;
            this.disabled = false;
            if(!this.errors.includes(err.error)){
              if(typeof err.error == "string") this.errors.push(err.error);
              else{
                let errors = err.error.errors;
                if(errors.oldPassword != undefined){
                  errors.oldPassword.forEach((err: string) => this.errors.push(err));
                }
                if(errors.newPassword != undefined){
                  errors.newPassword.forEach((err: string) => this.errors.push(err));
                }
                if(errors.confirmNewPassword != undefined){
                  errors.confirmNewPassword.forEach((err: string) => this.errors.push(err));
                }
              }
            }
            return [];
          }),
          take(1)
        ).subscribe(res => {
          this.router.navigate(['dashboard/orders/' + this.userId]);
        });
      }
    }
  }

  onCloseClick(){
    this.router.navigate(['dashboard/orders/' + this.userId]);
  }
}
