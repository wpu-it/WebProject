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
  rightPageIdx: number = 3;
  pageSize: number = 4;

  constructor(
    readonly fantoursService: FantoursService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  onPaginatorClick(event: PageEvent){
    if(Number(event.previousPageIndex) < event.pageIndex){
      this.leftPageIdx += 4;
      this.rightPageIdx += 4;
    }
    else{
      this.leftPageIdx -= 4;
      this.rightPageIdx -= 4;
    }
    this.getFantours();
    window.scroll(0, 0);
  }

  ngOnInit(): void {
    this.getFantours();
  }

  getFantours(){
    this.fantoursService.fantours$.subscribe(tours => {
      for(let i = 0; i < tours.length; i++){
        if(tours[i].quantity < 0) tours.splice(i, 1);
      }
      this.totalResults = tours.length;
      let result = tours.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.fantours$ = of(result);
    });
  }
}
