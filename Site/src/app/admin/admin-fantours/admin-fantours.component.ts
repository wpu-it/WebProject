import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {FantoursService} from "../../user/fantours/fantours.service";
import {Fantour} from "../../user/fantours/fantours.interfaces";
import {PageEvent} from "@angular/material/paginator";
import {Observable, of} from "rxjs";

@Component({
  selector: 'admin-fantours',
  templateUrl: 'admin-fantours.component.html',
  styleUrls: ['admin-fantours.component.scss']
})
export class AdminFantoursComponent implements OnInit{
  fantours$: Observable<Fantour[]>;
  tourId: number = 1;

  totalResults: number;
  leftPageIdx: number = 0;
  rightPageIdx: number = 1;
  pageSize: number = 2;

  constructor(
    private readonly fantoursService: FantoursService
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

  changeEvent(){
    this.getFantours();
  }

  updateEvent(id: number){
    this.tourId = id;
  }

  removeEvent(id: number){
    this.fantoursService.removeFantour(id).subscribe(res => {
      document.location.reload();
    });
  }

  ngOnInit(): void {
    this.getFantours();
  }


  getFantours(){
    this.fantoursService.fantours$.subscribe(tours => {
      this.totalResults = tours.length;
      let result = tours.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.fantours$ = of(result);
    });
  }
}

