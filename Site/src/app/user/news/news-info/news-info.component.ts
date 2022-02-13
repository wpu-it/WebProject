import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../news.service";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {News} from "../news.interfaces";

@Component({
  selector: 'news-info',
  templateUrl: 'news-info.component.html',
  styleUrls: ['news-info.component.scss']
})
export class NewsInfoComponent implements OnInit{
  news$: Observable<News>;
  newsId: number;
  constructor(
    private readonly newsService: NewsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.newsId = Number(params.id);
      this.news$ = this.newsService.getNewsById(this.newsId);
    });
  }

  goToPrevPage(){
    this.location.back();
  }

  goToMainPageClick(){
    this.router.navigate(['/']);
  }
}
