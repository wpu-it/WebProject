import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../news.service";
import {Observable, of} from "rxjs";
import {Location} from "@angular/common";
import {News} from "../news.interfaces";
import {catchError} from "rxjs/operators";
import {PicturesService} from "../../../pictures.service";

@Component({
  selector: 'news-info',
  templateUrl: 'news-info.component.html',
  styleUrls: ['news-info.component.scss']
})
export class NewsInfoComponent{
  news$: Observable<News>;
  errors: string[] = [];
  newsId: number;
  errorUrl: string = '';
  constructor(
    private readonly newsService: NewsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly picturesService: PicturesService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.newsId = Number(params.id);
      this.newsService.getNewsById(this.newsId).pipe(
        catchError(err => {
          if(err.error == 'News not found'){
            this.errors.push(err.error);
          }
          return [];
        })
      ).subscribe(news => {
        this.news$ = of(news);
      });
    });
    this.picturesService.getPictureByName('Error content').subscribe(res => {
      this.errorUrl = res;
    });
  }

  goToPrevPage(){
    this.location.back();
  }

  goToMainPageClick(){
    this.router.navigate(['/']);
  }
}
