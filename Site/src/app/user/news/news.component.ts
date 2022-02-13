import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {News} from "./news.interfaces";
import {FantoursService} from "../fantours/fantours.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NewsService} from "./news.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.scss']
})
export class NewsComponent implements OnInit{
  news$: Observable<News[]>;

  totalResults: number;
  leftPageIdx: number = 0;
  rightPageIdx: number = 8;
  pageSize: number = 9;

  constructor(
    readonly newsService: NewsService,
    private readonly router: Router
  ) {
  }

  onPaginatorClick(event: PageEvent){
    if(Number(event.previousPageIndex) < event.pageIndex){
      this.leftPageIdx += 9;
      this.rightPageIdx += 9;
    }
    else{
      this.leftPageIdx -= 9;
      this.rightPageIdx -= 9;
    }
    this.getNews();
    window.scroll(0,0);
  }

  getNews(){
    this.newsService.news$.subscribe(news => {
      this.totalResults = news.length;
      let result = news.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.news$ = of(result);
    });
  }

  ngOnInit(): void {
    this.getNews();
  }
}
