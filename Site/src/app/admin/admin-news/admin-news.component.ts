import {Component, OnInit} from "@angular/core";
import {NewsService} from "../../user/news/news.service";
import {Observable, of} from "rxjs";
import {Fantour} from "../../user/fantours/fantours.interfaces";
import {News} from "../../user/news/news.interfaces";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'admin-news',
  templateUrl: 'admin-news.component.html',
  styleUrls: ['admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit{
  news$: Observable<News[]>;

  totalResults: number;
  leftPageIdx: number = 0;
  rightPageIdx: number = 1;
  pageSize: number = 2;

  newsId: number = 1;

  constructor(
    private readonly newsService: NewsService
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
    this.getNews();
  }

  ngOnInit(): void {
    this.getNews();
  }

  changeEvent(){
    this.getNews();
  }

  updateEvent(id: number){
    this.newsId = id;
  }

  removeEvent(id: number){
    this.newsService.removeNews(id).subscribe(res => {
      document.location.reload();
    });
  }

  getNews(){
    this.newsService.news$.subscribe(news => {
      this.totalResults = news.length;
      let result = news.slice(this.leftPageIdx, this.rightPageIdx + 1);
      this.news$ = of(result);
    });
  }
}
