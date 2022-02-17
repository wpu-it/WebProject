import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Fantour} from "../fantours.interfaces";
import {FantoursService} from "../fantours.service";
import {Location} from "@angular/common";
import {catchError} from "rxjs/operators";
import {PicturesService} from "../../../pictures.service";

@Component({
  selector: 'fantour-info',
  templateUrl: 'fantour-info.component.html',
  styleUrls: ['fantour-info.component.scss']
})
export class FantourInfoComponent{
  fantour$: Observable<Fantour>;
  fantourId: number;
  errors: string[] = [];
  errorUrl = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fantoursService: FantoursService,
    private readonly location: Location,
    private readonly router: Router,
    private readonly picturesService: PicturesService
  ) {
    this.activatedRoute.params.subscribe(params => {
      let tourId = Number(params.id);
      this.fantoursService.getFantourById(tourId).pipe(
        catchError(err => {
          if(err.error == 'Tour not found'){
            this.errors.push(err.error);
          }
          return [];
        })
      ).subscribe(fantour => {
        this.fantourId = fantour.id;
        this.fantour$ = of(fantour);
      });
    });
    this.picturesService.getPictureByName('Error content').subscribe(res => {
      this.errorUrl = res;
    });
  }

  onMakeOrderClick(){
    this.router.navigate(['order/new'], {queryParams: {tourId: this.fantourId}});
  }

  goToPrevPage(){
    this.location.back();
  }

  goToMainPageClick(){
    this.router.navigate(['/']);
  }
}
