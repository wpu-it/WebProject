import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {NewsService} from "../../../user/news/news.service";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-news',
  templateUrl: 'update-news.component.html',
  styleUrls: ['update-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UpdateNewsComponent implements OnChanges{
  form: FormGroup;
  errors: string[] = [];
  isConfirmed = true;
  disabled = false;
  @Input() newsId: number = 1;
  @Output() updateEvent = new EventEmitter();

  constructor(
    private readonly newsService: NewsService
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*'),
        Validators.maxLength(100)
      ]),
      'text': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*'),
        Validators.maxLength(500)
      ])
    });
    this.getNews();
  }

  ngOnChanges(changes: SimpleChanges){
    this.errors = [];
    this.getNews();
  }

  onCloseClick(){
    this.errors = [];
    this.getNews();
  }

  getNews(){
    this.newsService.getNewsById(this.newsId).subscribe(news => {
      this.form.patchValue({
        title: news.title,
        text: news.text
      });
    })
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
            if(typeof err.error == "string") this.errors.push(err.error);
            else{
              let errors = err.error.errors;
              if(errors.title != undefined){
                errors.title.forEach((err: string) => this.errors.push(err));
              }
              if(errors.text != undefined){
                errors.text.forEach((err: string) => this.errors.push(err));
              }
            }
          }
          return [];
        }),
        take(1)
      ).subscribe(res => {
        let ref = document.getElementById('popup-2-close');
        ref = ref ? ref : new HTMLElement();
        ref.click();
        this.updateEvent.emit();
      });
    }
  }
}
