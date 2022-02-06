import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PicturesService} from "../pictures.service";
import {Location} from "@angular/common";

@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit{
  switcher: string = 'Sign up';
  loginVisible: boolean = true;
  welcomeUrl = '';

  constructor(
    private readonly picturesService: PicturesService,
    private readonly router: Router,
    private readonly location: Location
  ) {
  }

  onSwitchClick(){
    if(this.switcher === 'Sign up') this.switcher = 'Sign in';
    else this.switcher = 'Sign up';

    this.loginVisible = !this.loginVisible;
  }

  ngOnInit(): void {
    this.picturesService.getPictureByName('Welcome').subscribe(res => {
      this.welcomeUrl = res;
    });
  }

  goToPrevPage(){
    this.location.back();
  }

  goToMainPageClick(){
    this.router.navigate(['/']);
  }
}
