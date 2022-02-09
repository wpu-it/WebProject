import {Component, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../../../environments/environment.model";
import {Observable} from "rxjs";
import {ApiNews} from "./news-api.interfaces";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable()
export class NewsApiService{
  constructor(
    private readonly httpClient: HttpClient,
    private readonly env: EnvironmentModel
  ) {
  }

  getAllNews(){
    return this.httpClient.get<ApiNews[]>([
      this.env.fantoursAPI,
      'news',
      'get-all'
    ].join('/')).pipe(
      publishReplay(1),
      refCount()
    );
  }

  getNewsById(id: number){
    return this.httpClient.get<ApiNews>([
      this.env.fantoursAPI,
      'news',
      'get'
    ].join('/'),
      {
        params: {
          id: id
        }
      }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  addNews(title: string, text: string, photo: string){
    return this.httpClient.post<ApiNews[]>([
      this.env.fantoursAPI,
      'news'
    ].join('/'),{
      title, text, photo
    }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  updateNews(id: number, title: string, text: string){
    return this.httpClient.put<ApiNews[]>([
      this.env.fantoursAPI,
      'news',
      'update'
    ].join('/'),{
      id: id,
      title: title,
      text: text
    }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  updateNewsPhoto(newPhoto: string, newsId: number){
    return this.httpClient.put<ApiNews[]>([
      this.env.fantoursAPI,
      'news',
      'update',
      'photo'
    ].join('/'),{
      newPhoto: newPhoto,
      newsId: newsId
    }).pipe(
      publishReplay(1),
      refCount()
    );
  }

  removeNews(id: number){
    return this.httpClient.delete<ApiNews[]>([
      this.env.fantoursAPI,
      'news',
      id
    ].join('/')).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
