import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../../../user/news/news.service";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-news',
  templateUrl: 'update-news.component.html',
  styleUrls: ['update-news.component.scss']
})
export class UpdateNewsComponent implements OnInit{
  form: FormGroup;
  disabled = false;
  errors: HttpErrorResponse[] = [];
  isConfirmed = true;
  newsId: number;

  constructor(
    private readonly newsService: NewsService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', Validators.required),
      'text': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.newsId = Number(params.id);
      this.newsService.getNewsById(this.newsId).subscribe(news => {
        this.form.patchValue({
          title: news.title,
          text: news.text
        });
      })
    });
  }

  onEditClick(){
    if(this.form.valid){
      const { title, text } = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.newsService.updateNews(this.newsId, title, text).pipe(
        catchError((err: HttpErrorResponse) => {
          this.isConfirmed = false;
          this.disabled = false;
          if(!this.errors.includes(err.error)){
            this.errors.push(err.error);
          }
          return [];
        }),
        take(1)
      ).subscribe(res => {
        this.router.navigate(['admin/news']);
      });
    }
  }

  onCloseClick(){
    this.router.navigate(['admin/news']);
    window.scroll(0, 0);
  }
}
