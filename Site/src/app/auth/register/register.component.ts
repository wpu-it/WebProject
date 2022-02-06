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
  errors: HttpErrorResponse[] = [];
  form: FormGroup;
  disabled = false;
  constructor(
    private readonly authService: AuthService
  ){
    this.form = new FormGroup({
      'fullname': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
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
              this.errors.push(err.error);
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
