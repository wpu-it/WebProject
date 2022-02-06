import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../users.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../user.interface";

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
      if(fullname != this.prevFullname){
        this.disabled = true;
        this.user.fullname = fullname;
        this.usersService.updateUser(this.user);
      }
    }
  }

  onCloseClick(){
    this.router.navigate(['dashboard']);
  }
}
