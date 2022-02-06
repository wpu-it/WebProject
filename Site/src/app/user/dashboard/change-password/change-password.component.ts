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
  errors: HttpErrorResponse[] = [];
  isConfirmed = true;
  userId: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'oldPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('', Validators.required),
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
              this.errors.push(err.error);
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
