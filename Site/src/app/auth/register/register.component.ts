import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {catchError, take} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {FileChangeEvent} from "@angular/compiler-cli/src/perform_watch";

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent{
  isRegistered = true;
  errors: string[] = [];
  form: FormGroup;
  disabled = false;
  constructor(
    private readonly authService: AuthService
  ){
    this.form = new FormGroup({
      'fullname': new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z,a-z, ]+$'),
        Validators.maxLength(50)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w.]+[@][A-Za-z]+[.]+[A-Za-z.]+$'),
        Validators.maxLength(50)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}'),
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      'confirmPassword': new FormControl('', Validators.required),
      'photo': new FormControl(null, Validators.required)
    });
  }


  onRegisterClick(){
    if(this.form.valid){
      const { fullname, email, password, confirmPassword, photo } = this.form.value;
      if(password === confirmPassword){
        this.errors = [];
        this.disabled = true;
        this.authService.register(fullname, email, password, photo).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isRegistered = false;
            this.disabled = false;
            if(!this.errors.includes(err.error)){
              if(typeof err.error == "string") this.errors.push(err.error);
              else{
                let errors = err.error.errors;
                if(errors.fullname != undefined){
                  errors.fullname.forEach((err: string) => this.errors.push(err));
                }
                if(errors.email != undefined){
                  errors.email.forEach((err: string) => this.errors.push(err));
                }
                if(errors.password != undefined){
                  errors.password.forEach((err: string) => this.errors.push(err));
                }
                if(errors.confirmPassword != undefined){
                  errors.confirmPassword.forEach((err: string) => this.errors.push(err));
                }
                if(errors.photo != undefined){
                  errors.photo.forEach((err: string) => this.errors.push(err));
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
