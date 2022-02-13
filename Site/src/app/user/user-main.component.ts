import {Component, OnChanges, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'user-main',
  templateUrl: 'user-main.component.html',
  styleUrls: ['user-main.component.scss']
})
export class UserMainComponent implements OnInit{

  constructor(
    private readonly authService: AuthService,
    readonly router: Router
  ) {
  }

  ngOnInit(): void {
    if(this.authService.role == 'admin') this.router.navigate(['admin/fantours']);
  }

}
