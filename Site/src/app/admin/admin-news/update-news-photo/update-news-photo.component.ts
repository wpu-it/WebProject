import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../../../user/news/news.service";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-news-photo',
  templateUrl: 'update-news-photo.component.html',
  styleUrls: ['update-news-photo.component.scss']
})
export class UpdateNewsPhotoComponent implements OnInit{
  form: FormGroup;
  disabled = false;
  newsId: number;
  isConfirmed = true;
  errors: HttpErrorResponse[] = [];

  constructor(
    private readonly newsService: NewsService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ){
    this.form = new FormGroup({
      'photo': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.newsId = Number(params.id);
    })
  }

  onEditClick(){
    if(this.form.valid){
      const { photo } = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.newsService.updateNewsPhoto(photo, this.newsId).pipe(
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

  onPhotoChange(event: any){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          photo: reader.result
        });
      }
    }
  }
}
