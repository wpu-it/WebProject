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

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ){
    this.form = new FormGroup({
      'photo': new FormControl('', Validators.required)
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
      this.disabled = true;
      this.usersService.updateUsersPhoto(photo, this.userId).subscribe();
    }
  }

  onCloseClick(){
    this.router.navigate(['dashboard']);
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
