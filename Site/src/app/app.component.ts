import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "./shared/storage/local-storage";
import {PicturesService} from "./pictures.service";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Site';
  logoUrl = '';
  constructor(
    readonly localStorage: BrowserLocalStorage,
    private readonly router: Router,
    private readonly picturesService: PicturesService,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.picturesService.getPictureByName('Logo').subscribe(res => {
      this.logoUrl = res;
    });
  }

  onLogoutClick(){
    this.localStorage.removeItem('accessToken');
    this.authService.role = '';
    this.router.navigate(['/']);
  }

  onDashboardClick(){
    this.router.navigate(['/dashboard']);
  }

}
