import {Component, OnInit} from "@angular/core";
import {FantoursService} from "./fantours.service";
import {Router,} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'fantours',
  templateUrl: 'fantours.component.html',
  styleUrls: ['fantours.component.scss']
})
export class FantoursComponent implements OnInit{
  constructor(
    readonly fantoursService: FantoursService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

  }

  ngOnInit(): void {
    if(this.authService.role == 'admin'){
      this.router.navigate(['admin']);
    }
  }


}
