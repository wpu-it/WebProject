import {Component} from "@angular/core";
import {NewsService} from "../../../user/news/news.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FantoursService} from "../../../user/fantours/fantours.service";

@Component({
  selector: 'remove-fantour',
  templateUrl: 'remove-fantour.component.html',
  styleUrls: ['remove-fantour.component.scss']
})
export class RemoveFantourComponent{
  constructor(
    private readonly fantoursService: FantoursService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      let newsId = Number(params.id);
      this.fantoursService.removeFantour(newsId).subscribe(res => {
        this.router.navigate(['admin/fantours']);
      });
    })
  }
}
