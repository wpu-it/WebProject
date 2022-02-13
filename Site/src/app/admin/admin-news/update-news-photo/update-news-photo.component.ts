import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
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
export class UpdateNewsPhotoComponent{
  form: FormGroup;
  @Input() newsId: number;
  @Output() updateEvent = new EventEmitter();
  isConfirmed = true;
  errors: string[] = [];

  constructor(
    private readonly newsService: NewsService
  ){
    this.form = new FormGroup({
      'photo': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }


  onEditClick(){
    if(this.form.valid){
      const { photo } = this.form.value;
      this.errors = [];
      if(photo.length < 1){
        this.isConfirmed = false;
        this.errors.push('Photo is required')
      }
      if(this.errors.length == 0){
        this.newsService.updateNewsPhoto(photo, this.newsId).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isConfirmed = false;
            if(!this.errors.includes(err.error)){
              if(typeof err.error == "string") this.errors.push(err.error);
              else{
                let errors = err.error.errors;
                if(errors.photo != undefined){
                  errors.photo.forEach((err: string) => this.errors.push(err));
                }
              }
            }
            return [];
          }),
          take(1)
        ).subscribe(res => {
          let ref = document.getElementById('popup-3-close');
          ref = ref ? ref : new HTMLElement();
          ref.click();
          this.updateEvent.emit();
        });
      }
    }
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
