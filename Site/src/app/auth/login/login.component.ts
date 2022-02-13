import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {catchError, take, tap} from "rxjs/operators";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent{
  form: FormGroup;
  disabled = false;
  isLogined = true;
  errors: string[] = [];
  constructor(
    private readonly authService: AuthService,
    private readonly localStorage: BrowserLocalStorage
  ){
    this.form = new FormGroup({
      'email': new FormControl('vasya@gmail.com', Validators.required),
      'password': new FormControl('Aa12345%', Validators.required)
    });
  }

  onLoginClick(){
    if(this.form.valid){
      const { email, password } = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.authService.login(email, password).pipe(
        catchError((err: HttpErrorResponse) => {
          this.disabled = false;
          this.isLogined = false;
          if(!this.errors.includes(err.error)){
            if(typeof err.error == "string") this.errors.push(err.error);
            else{
              let errors = err.error.errors;
              if(errors.email != undefined){
                errors.email.forEach((err: string) => this.errors.push(err));
              }
              if(errors.password != undefined){
                errors.password.forEach((err: string) => this.errors.push(err));
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
