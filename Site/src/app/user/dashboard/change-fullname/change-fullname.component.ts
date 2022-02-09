import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../users.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../user.interface";
import {catchError, take} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'change-fullname',
  templateUrl: 'change-fullname.component.html',
  styleUrls: ['change-fullname.component.scss']
})
export class ChangeFullnameComponent implements OnInit{
  form: FormGroup;
  user: User;
  disabled = false;
  prevFullname = '';
  isConfirmed = true;
  errors: HttpErrorResponse[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'fullname': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe(us => {
      this.prevFullname = us.fullname;
      this.user = us;
      this.form.patchValue({
        fullname: us.fullname
      });
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { fullname } = this.form.value;
      this.errors = [];
      if(fullname != this.prevFullname){
        this.disabled = true;
        this.user.fullname = fullname;
        this.usersService.updateUser(this.user).pipe(
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
