import {Component} from "@angular/core";
import {Router} from "@angular/router";
import { Location } from '@angular/common'
import {UsersService} from "./users.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {PicturesService} from "../../pictures.service";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent{
  userId: number;
  adminPhoto: string = ''
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    readonly usersService: UsersService,
    private readonly picturesService: PicturesService,
    private readonly localStorage: BrowserLocalStorage
  ) {
    let token = this.localStorage.getItem('accessToken');
    this.usersService.getUserByAccessToken(token ? token : '');
    this.usersService.user$.subscribe(us => {
      this.userId = us.id;
      if(us.isAdmin) {
        this.picturesService.getPictureByName('Admin dashboard').subscribe(res => this.adminPhoto = res);
      }
    })
  }

  goToMainPageClick(){
    this.router.navigate(['/']);
  }

  goToPrevPage(){
    this.location.back();
  }
}
