import {Component} from "@angular/core";
import {Router} from "@angular/router";
import { Location } from '@angular/common'
import {UsersService} from "./users.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent{
  userId: number;
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    readonly usersService: UsersService,
    private readonly localStorage: BrowserLocalStorage
  ) {
    let token = this.localStorage.getItem('accessToken');
    this.usersService.getUserByAccessToken(token ? token : '');
    this.usersService.user$.subscribe(us => {
      this.userId = us.id;
    })
  }

  goToMainPageClick(){
    this.router.navigate(['/']);
  }

  goToPrevPage(){
    this.location.back();
  }
}
