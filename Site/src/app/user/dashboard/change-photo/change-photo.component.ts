import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UsersService} from "../users.service";
import {catchError, take} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'change-photo',
  templateUrl: 'change-photo.component.html',
  styleUrls: ['change-photo.component.scss']
})
export class ChangePhotoComponent implements OnInit{
  form: FormGroup;
  disabled = false;
  userId: number;
  isConfirmed = true;
  errors: string[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ){
    this.form = new FormGroup({
      'photo': new FormControl('', )
    });
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe(us => {
      this.userId = us.id;
    })
  }

  onEditClick(){
    if(this.form.valid){
      const { photo } = this.form.value;
      this.errors = [];
      this.disabled = true;
      if(photo.length < 1) {
        this.isConfirmed = false;
        this.disabled = false;
        this.errors.push('Photo is required');
      }
      if(this.errors.length == 0){
        this.usersService.updateUsersPhoto(photo, this.userId).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isConfirmed = false;
            this.disabled = false;
            if(!this.errors.includes(err.error)){
              if(typeof err.error == "string") this.errors.push(err.error);
              else{
                let errors = err.error.errors;
                if(errors.photo != undefined){
                  errors.photo.forEach((err: string) => this.errors.push(err));
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
