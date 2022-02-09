import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {News} from "./news.interfaces";
import {NewsApiService} from "../../api/news/news-api.service";
import {Router} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {ApiNews} from "../../api/news/news-api.interfaces";

@Injectable()
export class NewsService{
  news$: Observable<News[]>;

  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly router: Router
  ) {
    this.news$ = this.newsApiService.getAllNews().pipe(
      map(news => {
        return this.mapNews(news);
      })
    );
  }

  getNewsById(id: number){
    return this.newsApiService.getNewsById(id).pipe(
      map(news => {
        return this.mapOneNews(news);
      })
    );
  }

  addNews(title: string, text: string, photo: string){
    return this.newsApiService.addNews(title, text, photo).pipe(
      map(news => {
        return this.mapNews(news);
      }),
      tap(news => {
        this.news$ = of(news);
      })
    );
  }

  updateNews(id: number, title: string, text: string){
    return this.newsApiService.updateNews(id, title, text).pipe(
      map(news => {
        return this.mapNews(news);
      }),
      tap(news => {
        this.news$ = of(news);
      })
    );
  }

  updateNewsPhoto(newPhoto: string, newsId: number){
    return this.newsApiService.updateNewsPhoto(newPhoto, newsId).pipe(
      map(news => {
        return this.mapNews(news);
      }),
      tap(news => {
        this.news$ = of(news);
      })
    );
  }

  removeNews(id: number){
    return this.newsApiService.removeNews(id).pipe(
      map(news => {
        return this.mapNews(news);
      }),
      tap(news => {
        this.news$ = of(news);
      })
    );
  }

  mapNews(news: ApiNews[]){
    let result: News[] = [];
    news.forEach(newS => {
      result.push({
        id: newS.id,
        title: newS.title,
        text: newS.text,
        photo: newS.photo
      });
    });
    return result;
  }

  mapOneNews(newS: ApiNews){
    let result: News = {
      id: newS.id,
      title: newS.title,
      text: newS.text,
      photo: newS.photo
    };
    return result;
  }
}
