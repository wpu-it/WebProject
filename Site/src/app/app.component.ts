import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "./shared/storage/local-storage";
import {PicturesService} from "./pictures.service";
import {AuthService} from "./auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "./user/dashboard/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Site';
  logoUrl = '';
  backgroundUrl = '';
  facebookLogo = '';
  instaLogo = '';
  twitterLogo = '';
  form: FormGroup;
  userId: number;

  constructor(
    readonly localStorage: BrowserLocalStorage,
    private readonly router: Router,
    private readonly picturesService: PicturesService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    this.form = new FormGroup({
      'search': new FormControl('', Validators.required)
    });
    localStorage.removeItem('search');
    localStorage.removeItem('price');
  }

  ngOnInit(): void {
    this.picturesService.getPictureByName('Logo').subscribe(res => {
      this.logoUrl = res;
    });
    this.picturesService.getPictureByName('Background').subscribe(res => {
      this.backgroundUrl = res;
    });
    this.picturesService.getPictureByName('Facebook logo').subscribe(res => {
      this.facebookLogo = res;
    });
    this.picturesService.getPictureByName('Insta logo').subscribe(res => {
      this.instaLogo = res;
    });
    this.picturesService.getPictureByName('Twitter logo').subscribe(res => {
      this.twitterLogo = res;
    });
    this.usersService.user$.subscribe(us => {
      this.userId = us.id;
    });
  }

  onLogoutClick(){
    this.localStorage.removeItem('accessToken');
    this.authService.role = '';
    this.router.navigate(['/']);
  }

  onDashboardClick(){
    this.router.navigate(['/dashboard/orders/' + this.userId]);
  }

}
