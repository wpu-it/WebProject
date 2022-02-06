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
  errors: HttpErrorResponse[] = [];
  constructor(
    private readonly authService: AuthService,
    private readonly localStorage: BrowserLocalStorage
  ){
    this.form = new FormGroup({
      'email': new FormControl('admin@gmail.com', Validators.required),
      'password': new FormControl('123456', Validators.required)
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
            this.errors.push(err.error);
          }
          return [];
        }),
        take(1)
      ).subscribe();

    }
  }
}
