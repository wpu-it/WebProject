import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {FantoursService} from "./fantours.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Observable, of} from "rxjs";
import {Fantour} from "./fantours.interfaces";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Picture} from "../../picture.interface";
import {PicturesService} from "../../pictures.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'fantours',
  templateUrl: 'fantours.component.html',
  styleUrls: ['fantours.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FantoursComponent implements OnInit, OnChanges{
  fantours$: Observable<Fantour[]>;
  @Input() search: string = '';
  @Input() values: object = { min: 0, max: 0 };
  @Input() isReset: boolean = false;
  @ViewChild('paginator') paginator: MatPaginator;
  min: number = -1;
  max: number = -1;

  errorUrl: string = '';

  totalResults: number;
  leftPageIdx: number = 0;
  rightPageIdx: number = 3;
  pageSize: number = 4;

  constructor(
    readonly fantoursService: FantoursService,
    private readonly picturesService: PicturesService,
    private readonly localStorage: BrowserLocalStorage
  ) {

  }

  onPaginatorClick(event: PageEvent){
    if(event.previousPageIndex != undefined){
      if(Number(event.previousPageIndex) < event.pageIndex){
        this.leftPageIdx += (4 * (event.pageIndex - event.previousPageIndex));
        this.rightPageIdx += (4 * (event.pageIndex - event.previousPageIndex));
      }
      else{
        this.leftPageIdx -= (4 * (event.previousPageIndex - event.pageIndex));
        this.rightPageIdx -= (4 * (event.previousPageIndex - event.pageIndex));
      }
      this.callFantoursMethod();
      window.scroll(0, 0);
    }
  }

  ngOnInit(): void {
    this.callFantoursMethod();
    this.picturesService.getPictureByName('Error content').subscribe(res => {
      this.errorUrl = res;
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes.search){
      this.getFantoursBySearch();
      if(this.paginator != undefined)
        this.paginator.firstPage();
    }
    else if(changes.values){
      this.min = Number(changes.values.currentValue.min);
      this.max = Number(changes.values.currentValue.max);
      this.getFantoursByPriceValues();
      if(this.paginator != undefined)
        this.paginator.firstPage();
    }
    else if(changes.isReset){
      this.search = '';
      this.values = {min: -1, max: -1};
      this.min = -1;
      this.max = -1;
      this.isReset = false;
      this.getFantours();
      if(this.paginator != undefined)
        this.paginator.firstPage();
    }
  }

  getFantours(){
    this.fantoursService.fantours$.subscribe(tours => {
      for(let i = 0; i < tours.length; i++){
        if(tours[i].quantity < 1) tours.splice(i, 1);
      }
      this.totalResults = tours.length;
      let result = tours.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.fantours$ = of(result);
    });
  }

  getFantoursBySearch(){
    this.search = this.search.toUpperCase();
    let result: Fantour[] = [];
    this.fantoursService.fantours$.subscribe(tours => {
        for (let i = 0; i < tours.length; i++) {
          if (tours[i].quantity < 1) tours.splice(i, 1);
          else if (tours[i].title.toUpperCase().includes(this.search)) result.push(tours[i]);
        }
        this.totalResults = result.length;
        result = result.slice(this.leftPageIdx, this.rightPageIdx + 1);
        this.fantours$ = of(result);
    });
  }

  getFantoursByPriceValues(){
    let result: Fantour[] = [];
    this.fantoursService.fantours$.subscribe(tours => {
      for(let i = 0; i < tours.length; i++){
        let price = tours[i].priceWithoutTicket + tours[i].ticketPrice;
        if(tours[i].quantity < 1) tours.splice(i, 1);
        else if(price >= this.min && price <= this.max) result.push(tours[i]);
      }
      this.totalResults = result.length;
      result = result.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.fantours$ = of(result);
    });
  }

  callFantoursMethod(){
    let srch = this.localStorage.getItem('search')
    this.search = srch ? srch : '';

    let price = this.localStorage.getItem('price');
    price = price ? price : '';
    if(price != null){
      let words = price.split(' ');
      this.min = Number(words[0]);
      this.max = Number(words[1]);
    }
    if(this.search != ''){
      this.getFantoursBySearch();
    }
    else if(this.min > -1 && this.max > -1){
      this.getFantoursByPriceValues();
    }
    else{
      this.getFantours();
    }
  }
}
