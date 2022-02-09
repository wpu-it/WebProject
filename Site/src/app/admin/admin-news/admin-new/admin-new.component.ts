import {Component, Input} from "@angular/core";
import {News} from "../../../user/news/news.interfaces";
import {Router} from "@angular/router";
import {NewsService} from "../../../user/news/news.service";

@Component({
  selector: 'admin-new',
  templateUrl: 'admin-new.component.html',
  styleUrls: ['admin-new.component.scss']
})
export class AdminNewComponent{
  @Input() news: News;

  constructor(
    private readonly newsService: NewsService,
    private readonly router: Router
  ) {
  }

  onRemoveClick(){
    this.router.navigate(['admin/news/remove/' + this.news.id]);
  }

  onUpdateClick(){
    this.router.navigate(['admin/news/edit/' + this.news.id]);
  }

  onUpdatePhotoClick(){
    this.router.navigate(['admin/news/edit/photo/' + this.news.id]);
  }
}
