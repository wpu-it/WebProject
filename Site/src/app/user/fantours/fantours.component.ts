import {Component, OnInit} from "@angular/core";
import {FantoursService} from "./fantours.service";
import {Router,} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Observable, of} from "rxjs";
import {Fantour} from "./fantours.interfaces";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'fantours',
  templateUrl: 'fantours.component.html',
  styleUrls: ['fantours.component.scss']
})
export class FantoursComponent implements OnInit{
  fantours$: Observable<Fantour[]>;

  totalResults: number;
  leftPageIdx: number = 0;
  rightPageIdx: number = 5;
  pageSize: number = 6;

  constructor(
    readonly fantoursService: FantoursService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  onPaginatorClick(event: PageEvent){
    if(Number(event.previousPageIndex) < event.pageIndex){
      this.leftPageIdx += 2;
      this.rightPageIdx += 2;
    }
    else{
      this.leftPageIdx -= 2;
      this.rightPageIdx -= 2;
    }
    this.getFantours();
  }

  ngOnInit(): void {
    if(this.authService.role == 'admin'){
      this.router.navigate(['admin']);
      this.getFantours();
    }
  }

  getFantours(){
    this.fantoursService.fantours$.subscribe(tours => {
      this.totalResults = tours.length;
      let result = tours.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.fantours$ = of(result);
    });
  }
}
