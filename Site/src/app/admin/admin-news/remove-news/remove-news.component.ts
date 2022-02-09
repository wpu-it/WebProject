import {Component} from "@angular/core";
import {NewsService} from "../../../user/news/news.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector:'remove-news',
  templateUrl: 'remove-news.component.html',
  styleUrls: ['remove-news.component.scss']
})
export class RemoveNewsComponent{
  constructor(
    private readonly newsService: NewsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      let newsId = Number(params.id);
      this.newsService.removeNews(newsId).subscribe(res => {
        this.router.navigate(['admin/news']);
      });
    })
  }
}
